import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ASSIGNMENT_PRIORITY } from 'src/types/assignment-priority.enums';

export class CreateAssignmentDto {
  @IsString()
  subject: string;

  @IsNumber()
  assignmentNumber: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  submitTo: string;

  @IsEnum(Object.values(ASSIGNMENT_PRIORITY))
  priority: string;

  @IsString()
  createdBy: string;

  @IsOptional()
  @IsDateString()
  deadline?: Date;

  @IsString()
  guildId;
}
