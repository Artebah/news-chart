import { TimeFilterValues } from "../types/TimeFilterValues";

export function getDataRange(filterByTime: TimeFilterValues, timestamps: number[]) {
  const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  const FULL_TIME = timestamps[timestamps.length - 1] - timestamps[0];

  switch (filterByTime) {
    case "seconds":
      return DAY_IN_MILLISECONDS * 7;
    case "minutes":
      return DAY_IN_MILLISECONDS * 7;
    case "hours":
      return DAY_IN_MILLISECONDS * 30;
    case "days":
      return FULL_TIME;
  }
}
