import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AssignmentService } from 'src/assignment/assignment.service';
import { IAssignmentDocument } from 'src/assignment/interfaces/assignment.interface';
import { DiscordService } from 'src/discord/discord.service';
@Injectable()
export class ReminderService {
  constructor(
    private readonly assignmentService: AssignmentService,
    private readonly discordService: DiscordService,
  ) {}

  @Cron('0 5 * * *')
  async reminder() {
    try {
      const assignments = await this.assignmentService.fetchAllAssignments();

      const upcomingAssignments = assignments.filter((assignment) =>
        this.hasUpcomingDeadline(assignment),
      );

      for (const assignment of upcomingAssignments) {
        await this.discordService.sendAssignmentToChannel(
          process.env.TEST_CHANNEL ?? '',
          assignment,
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      console.log(`Sent ${upcomingAssignments.length} assignment reminders`);
    } catch (error) {
      console.error('Reminder cron failed:', error);
    }
  }

  private hasUpcomingDeadline(assignment: IAssignmentDocument): boolean {
    // Guard against missing deadline
    if (!assignment.deadline) {
      return false;
    }

    const deadlineDate = new Date(assignment.deadline);
    if (isNaN(deadlineDate.getTime())) {
      console.warn(
        `Invalid deadline format: ${new Date(assignment.deadline).toLocaleString()}`,
      );
      return false;
    }

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    return deadlineDate > now && deadlineDate <= tomorrow;
  }
}
