import { Module } from '@nestjs/common';
import { AssignmentModule } from 'src/assignment/assignment.module';
import { DiscordService } from './discord.service';
import { DiscordSlashCommand } from './commands/discord-commands';

@Module({
  imports: [AssignmentModule],
  providers: [DiscordService, DiscordSlashCommand],
  exports: [DiscordService],
})
export class DiscordModule {}
