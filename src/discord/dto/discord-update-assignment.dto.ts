import { StringOption, NumberOption } from 'necord';

export class UpdateDiscordAssignmentDto {
  @StringOption({
    name: 'subject',
    description: 'Subject to delete',
    required: true,
  })
  subject: string;

  @NumberOption({
    name: 'assignment-number',
    description: 'assignmentNumber to be delted',
    required: true,
  })
  assignmentNumber: number;

  @StringOption({
    name: 'description',
    description: 'description of the assignment',
    required: false,
  })
  description?: string;

  @StringOption({
    name: 'deadline',
    description: 'deadline of the assignment',
    required: false,
  })
  deadline?: string;
}
