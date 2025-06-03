import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentModule } from './assignment/assignment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { RemindersModule } from './reminders/reminders.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AssignmentModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),

    NecordModule.forRootAsync({
      useFactory: () => {
        const token = process.env.DISCORD_TOKEN;
        const guildId = process.env.DISCORD_DEVELOPMENT_GUILD_ID;

        if (!token) throw new Error('DISCORD_TOKEN is required');
        if (!guildId)
          throw new Error('DISCORD_DEVELOPMENT_GUILD_ID is required');

        return {
          token,
          intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildMembers,
          ],
          development: [guildId],
        };
      },
    }),

    DiscordModule,

    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
