import { Context, SlashCommand, SlashCommandContext, Options } from 'necord';
import { AssignmentService } from 'src/assignment/assignment.service';
import { AddAssignmentDto } from '../dto/add-assignment.dto';
import { CreateAssignmentDto } from 'src/assignment/dto/create-assignment.dto';
import { UpdateAssignmentDto } from 'src/assignment/dto/update-assignment.dto';
import { UpdateDiscordAssignmentDto } from '../dto/discord-update-assignment.dto';
import { Injectable } from '@nestjs/common';
import { DeleteAssignmentDto } from '../dto/discord-delete-assignment.dto';
import { DiscordService } from '../discord.service';
import { formatIsoToNepaliDate, timeRemaining } from 'src/utils/discord.utils';

@Injectable()
export class DiscordSlashCommand {
  constructor(
    private readonly assignmentService: AssignmentService,
    private readonly discordService: DiscordService,
  ) {}

  @SlashCommand({
    name: 'assignment-add',
    description: 'Add assignment',
  })
  async addAssignment(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    {
      subject,
      description,
      deadline,
      submitTo,
      priority,
      assignmentNumber,
    }: AddAssignmentDto,
  ) {
    try {
      const serviceDto: CreateAssignmentDto = {
        subject,
        assignmentNumber,
        description,
        submitTo,
        priority,
        deadline: deadline ? new Date(deadline) : undefined,
        createdBy: interaction.user.username,
        guildId: interaction.guildId || '',
      };
      if (serviceDto.deadline) {
        console.log(
          `deadline set ${serviceDto.deadline ? new Date(serviceDto.deadline).toLocaleString() : 'no deadline'}`,
        );
      }

      const createdAssignment =
        await this.assignmentService.createAssignment(serviceDto);
      await interaction.reply({
        content: '✅ Assignment added successfully!',
        flags: 64,
      });

      const timeRemainingString = timeRemaining(createdAssignment.deadline);

      let content =
        ` @everyone\n**Assignment Details**\n` +
        `**Subject**: ${createdAssignment.subject}\n` +
        `**Deadline**: ${formatIsoToNepaliDate(createdAssignment.deadline!)}\n` +
        `**Time Remaining**: ${timeRemainingString}\n` +
        `**Details**: ${createdAssignment.description || 'No additional details provided.'}`;

      await this.discordService.sendToChannel(
        process.env.TEST_CHANNEL ?? '',
        `${content}`,
      );
    } catch (error) {
      await interaction.reply({
        content: '❌ Failed to add assignment!',
        flags: 64,
      });
      if (error instanceof Error) {
        throw new Error(`Failed to add assignment: ${error.message}`);
      }
    }
  }

  @SlashCommand({
    name: 'assignment-update',
    description: 'Update assignment',
  })
  async updateAssignment(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    {
      subject,
      assignmentNumber,
      description,
      deadline,
    }: UpdateDiscordAssignmentDto,
  ) {
    try {
      const serviceUpdateDto: UpdateAssignmentDto = {
        description,
        deadline: deadline ? new Date(deadline) : undefined,
      };
      if (assignmentNumber === null || subject === null) {
        throw new Error('Invalid assignmentNumber or subject name');
      }

      const filter = { subject: subject, assignmentNumber: assignmentNumber };
      await this.assignmentService.updateAssignment(filter, serviceUpdateDto);
      await interaction.reply('✅ Assignment updated successfully!');
    } catch (error) {
      throw new Error(
        `Failed to update assignment ${(error as Error).message}`,
      );
    }
  }

  @SlashCommand({
    name: 'assignment-delete',
    description: 'Delete assignment',
  })
  async deleteAssignment(
    @Context() [interaction]: SlashCommandContext,
    @Options() { subject, assignmentNumber }: DeleteAssignmentDto,
  ) {
    try {
      await this.assignmentService.deleteAssignment(subject, assignmentNumber);
      await interaction.reply('✅ Assignment removed successfully!');
    } catch (error) {
      throw new Error(
        `Failed to delete assignment ${(error as Error).message}`,
      );
    }
  }

  @SlashCommand({
    name: 'assignment-fetch',
    description: 'Fetch assignment',
  })
  async fetchAssignment(@Context() [interaction]: SlashCommandContext) {
    try {
      const assignments = await this.assignmentService.fetchAllAssignments();
      if (assignments.length === 0) {
        await interaction.reply({
          content: 'Assignment xaina moj gara🥳',
          flags: 64,
        });
        return;
      }

      const assignmentList = assignments
        .map((a, idx) => {
          return [
            `__**Assignment ${idx + 1}**__`,
            `• **Subject** : ${a.subject}`,
            `• **Priority** : ${a.priority.trim()}`,
            `• **Deadline** : ${formatIsoToNepaliDate(a.deadline!)}`,
            `• **Time Remaining**: ${timeRemaining(a.deadline)}`,
            `• **Details** : ${a.description || '—'}`,
          ].join('\n');
        })
        .join('\n\n');

      await interaction.reply({
        content: `**Your Assignments:**\n\n${assignmentList}`,
        flags: 64,
      });
    } catch (error) {
      throw new Error(`Failed to fetch assignment ${(error as Error).message}`);
    }
  }
}
