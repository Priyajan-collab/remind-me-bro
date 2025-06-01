import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ASSIGNMENT_PRIORITY } from 'src/types/assignment-priority.enums';

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ required: true })
  subject: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true, enum: Object.values(ASSIGNMENT_PRIORITY) })
  priority: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true })
  submitTo: string;

  @Prop({ required: false })
  deadline?: Date;

  @Prop({ required: true })
  guildId: string;
}

export const assignmentSchema = SchemaFactory.createForClass(Assignment);
