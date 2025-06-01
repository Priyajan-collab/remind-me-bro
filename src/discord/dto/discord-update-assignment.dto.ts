import { StringOption } from 'necord';

export class UpdateDiscordAssignmentDto {
  @StringOption({
    name: 'id',
    description: 'id of the assignment',
    required: false,
  })
  id: string;

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
