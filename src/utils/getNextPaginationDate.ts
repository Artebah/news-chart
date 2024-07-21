import { PAGINATION_LIMIT } from "../constants";
import { dateToTimestamp } from "../helpers/dateToTimestamp";
import { formatDate } from "../helpers/formatDate";
import { getTimeFilterK } from "../helpers/getTimeFilterK";
import { TimeFilterValues } from "../types/TimeFilterValues";

export function movePaginationDate(
  startDateStr: string,
  filterByTime: TimeFilterValues,
  direction: "back" | "next"
) {
  const startTimestamp = dateToTimestamp(startDateStr, "seconds");

  let nextTimestamp: number;

  if (direction === "next") {
    nextTimestamp = startTimestamp + getTimeFilterK(filterByTime) * PAGINATION_LIMIT;
  } else {
    nextTimestamp = startTimestamp - getTimeFilterK(filterByTime) * PAGINATION_LIMIT;
  }

  return formatDate(nextTimestamp);
}
