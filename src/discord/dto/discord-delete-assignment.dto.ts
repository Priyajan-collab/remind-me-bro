import { StringOption } from 'necord';

export class DeleteAssignmentDto {
  @StringOption({
    name: 'id',
    description: 'Assignment ID to delete',
    required: true,
  })
  id: string;
}
