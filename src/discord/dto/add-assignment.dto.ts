import { NumberOption, StringOption } from 'necord';
import { ASSIGNMENT_PRIORITY } from 'src/types/assignment-priority.enums';

export class AddAssignmentDto {
  @StringOption({
    name: 'subject',
    description: 'subject name',
    required: true,
  })
  subject: string;

  @NumberOption({
    name: 'assignment-number',
    description: 'assignment number',
    required: true,
  })
  assignmentNumber: number;

  @StringOption({
    name: 'submit-to',
    description: 'Name of prof',
    required: true,
  })
  submitTo: string;

  @StringOption({
    name: 'priority',
    description: 'priority ',
    required: true,
    choices: Object.values(ASSIGNMENT_PRIORITY).map((values) => ({
      name: values,
      value: values,
    })),
  })
  priority: string;

  @StringOption({
    name: 'description',
    description: 'description of the assignment',
    required: false,
  })
  description: string;

  @StringOption({
    name: 'deadline',
    description: 'deadline date ',
    required: false,
  })
  deadline?: string;
}
