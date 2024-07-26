import { TimeFilterValues } from "../types/TimeFilterValues";

export function dateToTimestamp(date: string, filterByTime: TimeFilterValues) {
  switch (filterByTime) {
    case "seconds":
      return new Date(date).getTime();
    case "minutes":
      return new Date(date.slice(0, -3) + ":00").getTime();
    case "hours":
      return new Date(date.slice(0, -6) + ":00:00").getTime();
    case "days":
      return new Date(date.slice(0, -9)).getTime();
    case "months":
      return new Date(date.slice(0, -12)).getTime();
    case "years":
      return new Date(date.slice(0, -15)).getTime();
  }
}
