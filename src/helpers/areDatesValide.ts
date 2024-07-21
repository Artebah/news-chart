export function areDatesValide(startDateStr: string, endDateStr: string) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (
    typeof startDate === "object" &&
    typeof endDate === "object" &&
    startDate < endDate
  ) {
    return true;
  }
  return false;
}
