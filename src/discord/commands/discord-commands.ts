import { Context, SlashCommand, SlashCommandContext, Options } from 'necord';
import { AssignmentService } from 'src/assignment/assignment.service';
import { AddAssignmentDto } from '../dto/add-assignment.dto';
import { CreateAssignmentDto } from 'src/assignment/dto/create-assignment.dto';
import { UpdateAssignmentDto } from 'src/assignment/dto/update-assignment.dto';
import { UpdateDiscordAssignmentDto } from '../dto/discord-update-assignment.dto';
import { Injectable } from '@nestjs/common';
import { DeleteAssignmentDto } from '../dto/discord-delete-assignment.dto';
import { DiscordService } from '../discord.service';

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
    { subject, description, submitTo, priority, deadline }: AddAssignmentDto,
  ) {
    try {
      const serviceDto: CreateAssignmentDto = {
        subject,
        description,
        submitTo,
        priority,
        deadline: deadline ? new Date(deadline) : undefined,
        createdBy: interaction.user.username,
        guildId: interaction.guildId || '',
      };

      const createdAssignment =
        await this.assignmentService.createAssignment(serviceDto);
      await interaction.reply('✅ Assignment added successfully!');

      await this.discordService.sendToChannel(
        process.env.TEST_CHANNEL ?? '', // keep this in env
        `📝 New assignment: **${createdAssignment.subject}** by ${interaction.user.username}`,
      );
    } catch (error) {
      await interaction.reply('❌ Failed to add assignment!');
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
    @Options() { id, description, deadline }: UpdateDiscordAssignmentDto,
  ) {
    try {
      const serviceUpdateDto: UpdateAssignmentDto = {
        description,
        deadline: deadline ? new Date(deadline) : undefined,
      };
      await this.assignmentService.updateAssignment(id, serviceUpdateDto);
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
    @Options() { id }: DeleteAssignmentDto,
  ) {
    try {
      await this.assignmentService.deleteAssignment(id);
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
        await interaction.reply('📋 No assignments found!');
        return;
      }

      const assignmentList = assignments
        .map(
          (assignment, index) =>
            `${index + 1}. **${assignment.subject}** - ${assignment.priority}\n   📝 ${assignment.description || 'No description'}\n   📅 ${assignment.deadline ? assignment.deadline.toDateString() : 'No deadline'}`,
        )
        .join('\n\n');

      await interaction.reply(`📋 **Your Assignments:**\n\n${assignmentList}`);
    } catch (error) {
      throw new Error(`Failed to fetch assignment ${(error as Error).message}`);
    }
  }
}
