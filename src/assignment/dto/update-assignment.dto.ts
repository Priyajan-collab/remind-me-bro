import { CreateAssignmentDto } from './create-assignment.dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateAssignmentDto extends PickType(CreateAssignmentDto, [
  'description',
  'deadline',
]) {}
