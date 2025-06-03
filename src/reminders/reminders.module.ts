import { Module } from '@nestjs/common';
import { ReminderService } from './reminders.service';
import { AssignmentModule } from 'src/assignment/assignment.module';
import { DiscordModule } from 'src/discord/discord.module';

@Module({
  imports: [AssignmentModule, DiscordModule],
  providers: [ReminderService],
  exports: [ReminderService],
})
export class RemindersModule {}
