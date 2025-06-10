import NepaliDate from 'nepali-date-converter';

export const timeRemaining = (deadline) => {
  const currentTime: any = new Date();
  const deadlineTime: any = new Date(deadline);
  deadlineTime.setUTCHours(16, 0, 0, 0);
  const timeRemaining = deadlineTime - currentTime;

  // Convert time remaining to days, hours, and minutes
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutesRemaining = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
  );
  // Format the time remaining
  return `${daysRemaining} day(s), ${hoursRemaining} hour(s), ${minutesRemaining} minute(s)`;
};

export function formatIsoToNepaliDate(isoInput: string | Date): string {
  const adDate = typeof isoInput === 'string' ? new Date(isoInput) : isoInput;

  // AD → BS conversion
  const bsDate = new NepaliDate(adDate);

  // Extract BS components
  const year = bsDate.getYear();
  const month = bsDate.getMonth() + 1; // convert 0–11 → 1–12
  const day = bsDate.getDate();

  // Zero-pad month & day
  const mm = month.toString().padStart(2, '0');
  const dd = day.toString().padStart(2, '0');

  return `${year}-${mm}-${dd}`;
}
