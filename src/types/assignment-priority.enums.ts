export const ASSIGNMENT_PRIORITY = {
  HIGH: 'Very Important',
  MEDIUM: ' Important',
  LOW: ' eh fine ',
  none: 'do not bother',
};

export type ASSIGNMENT_PRIORITY =
  (typeof ASSIGNMENT_PRIORITY)[keyof typeof ASSIGNMENT_PRIORITY];
