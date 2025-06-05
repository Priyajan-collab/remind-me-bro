import { NumberOption, StringOption } from 'necord';

export class DeleteAssignmentDto {
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
}
