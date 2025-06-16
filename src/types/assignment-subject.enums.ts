export const SUBJECTS = {
  DATA_COMMUNICATION: 'Data Communication',
  PROBABILITY_AND_STATS: 'Probability and Stats',
  COMMUNICATION_ENGLISH: 'Communication English',
  INSTRUMENTATION_II: 'Instrumentation II',
  COMPUTER_GRAPHICS: 'Computer Graphics',
  COMPUTER_ORGANIZATION_AND_ARCHITECTURE:
    'Computer Organization And Architecture',
  SOFTWARE_ENGINEERING: 'Software Engineering',
} as const;

export type SUBJECTS = (typeof SUBJECTS)[keyof typeof SUBJECTS];
