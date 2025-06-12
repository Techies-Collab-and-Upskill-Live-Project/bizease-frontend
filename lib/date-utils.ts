// lib/date-utils.ts
export function getLastNDates(n: number): string[] {
  const today = new Date();
  return Array.from({ length: n }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (n - i - 1));
    return date.toDateString(); // or .toLocaleDateString() for cleaner display
  });
}
