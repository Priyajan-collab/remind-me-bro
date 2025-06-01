/**Assignment interface
 * i think this should be fine right?
 */

import { Model } from 'mongoose';
import { ASSIGNMENT_PRIORITY } from 'src/types/assignment-priority.enums';

interface IAssignmentDoument {
  subject: string;
  priority: ASSIGNMENT_PRIORITY;
  description?: string;
  submitTo: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
  deadline?: Date;
  guildId: string;
}
type IAssignmentModel = Model<IAssignmentDoument>;

export { IAssignmentModel, IAssignmentDoument };
