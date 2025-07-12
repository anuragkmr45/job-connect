/**
 * Calculates the number of full years between two dates.
 * If the end date hasn't reached the month/day of the start date in its final year,
 * that year is not counted.
 */
export const calculateYearsServed =(
  start: string | number | Date,
  end:   string | number | Date
): number => {
  const startDate = new Date(start);
  const endDate   = new Date(end);

  let years = endDate.getFullYear() - startDate.getFullYear();

  // If end month/day is before start month/day, subtract 1
  const monthDiff = endDate.getMonth() - startDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && endDate.getDate() < startDate.getDate())
  ) {
    years--;
  }

  // never return negative
  return Math.max(0, years);
}
