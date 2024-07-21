import { TimeFilterValues } from "../types/TimeFilterValues";

export function timestampToDate(timestamp: number, filterByTime: TimeFilterValues) {
  switch (filterByTime) {
    case "seconds":
      return new Date(timestamp).toLocaleTimeString();
    case "minutes":
      return new Date(timestamp).toLocaleTimeString().slice(0, -3) + ":00";
    case "hours":
      return new Date(timestamp).toLocaleTimeString().slice(0, -6) + ":00:00";
    case "days":
      return new Date(timestamp).toLocaleDateString();
  }
}
