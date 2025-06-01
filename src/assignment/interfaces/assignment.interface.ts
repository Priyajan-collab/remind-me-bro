/**Assignment interface
 * i think this should be fine right?
 */

export interface Assignment {
  id: number;
  subject: string;
  priority: 'Very Important' | 'Important' | 'eh fine' | 'do not bother';
  status: 'pending' | 'overDue' | 'no deadline';
  description?: string;
  submitTo: string;
  createdAt: Date;
  deadline?: Date;
  guildId: string;
}
