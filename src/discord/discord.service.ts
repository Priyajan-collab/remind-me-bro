import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';
import { Context, ContextOf, On, Once } from 'necord';
import { IAssignmentDocument } from 'src/assignment/interfaces/assignment.interface';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);
  private formatAssignment(assignment: IAssignmentDocument): string {
    return `**@everyone** 📚 **Assignment Reminder**
**Subject:** ${assignment.subject}
**Deadline:** ${assignment.deadline}
**Description:** ${assignment.description || 'No description'}
**Priority:** ${assignment.priority}
---`;
  }
  formatMultipleAssignments(assignments: IAssignmentDocument[]): string {
    if (assignments.length === 0) {
      return '📝 No assignments found!';
    }

    const header = `🔔 **Daily Assignment Reminder** (${assignments.length} assignments)\n\n`;
    const formattedAssignments = assignments
      .map((assignment) => this.formatAssignment(assignment))
      .join('\n');

    return header + formattedAssignments;
  }
  constructor(private readonly client: Client) {}
  @Once('ready')
  onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as : ${client.user?.tag}`);
  }
  @On('error')
  onError(error: Error) {
    this.logger.error(`An error has occurred: ${error.message}`);
  }
  async sendToChannel(channelId: string, message: string) {
    try {
      const channel = await this.client.channels.fetch(channelId);
      if (!channel || !channel.isTextBased()) {
        this.logger.error(`Channel ${channelId} not found or not text-based`);
        return;
      }
      if (channel && channel.isSendable()) {
        await channel.send(message);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to send message: ${error.message}`);
      }
    }
  }
  async sendAssignmentToChannel(
    channelId: string,
    assignment: IAssignmentDocument,
  ) {
    try {
      const channel = await this.client.channels.fetch(channelId);
      if (!channel || !channel.isTextBased()) {
        this.logger.error(`Channel ${channelId} not found or not text-based`);
        return;
      }
      const assignmentInString = this.formatAssignment(assignment);
      if (channel && channel.isSendable()) {
        await channel.send(assignmentInString);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to send message: ${error.message}`);
      }
    }
  }
}
