import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AssignmentSolution {
  @Prop({ required: true, type: String })
  subject: string;

  @Prop({ required: true, type: String })
  questions: string;

  @Prop({ required: false, type: String })
  answers: string;
}

export const AssignmentSolutionSchmea =
  SchemaFactory.createForClass(AssignmentSolution);
