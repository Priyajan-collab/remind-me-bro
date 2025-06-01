import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';
import { Context, ContextOf, On, Once } from 'necord';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);
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
}
