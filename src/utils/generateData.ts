import { PAGINATION_LIMIT } from "../constants";
import { binarySearch } from "../helpers/binarySearch";
import { dateToTimestamp } from "../helpers/dateToTimestamp";
import { getTimeFilterK } from "../helpers/getTimeFilterK";
import { timestampToDate } from "../helpers/timestampToDate";
import { InitDates } from "../types/InitDates";
import { Resource } from "../types/Resourse";
import { TimeFilterValues } from "../types/TimeFilterValues";

function generateData(
  resources: Resource[],
  filterByTime: TimeFilterValues,
  startDateStr: string
) {
  const posts = resources.flatMap((resource) => resource.Posts);
  const dates = posts.map((post) => post.pub_date).reverse();

  function fillNextTenSeconds(dates: string[]) {
    const timestamps = dates.map((date) => dateToTimestamp(date, filterByTime));

    const initDates: InitDates = {};
    const startTime = dateToTimestamp(startDateStr, filterByTime);
    const timeFilterK = getTimeFilterK(filterByTime);

    let currentTime = startTime;
    let i = binarySearch(timestamps, startTime);

    while (Object.keys(initDates).length < PAGINATION_LIMIT) {
      const timestamp = timestamps[i];

      //* count existing property
      if (timestamp in initDates) {
        initDates[timestamp] = initDates[timestamp] + 1;
        i++;
      } else {
        //* check current date which should be. Starting from currentTime = startTime
        if (timestamp === currentTime) {
          initDates[timestamp] = 1;
          currentTime += timeFilterK;
          i++;
        } else {
          //* add 0 count
          initDates[currentTime] = 0;
          currentTime += timeFilterK;
        }
      }
    }

    return initDates;
  }

  const updatedDateCountsObject = fillNextTenSeconds(dates);

  const timestamps = Object.keys(updatedDateCountsObject);
  const labels = timestamps.map((timestamp) => timestampToDate(+timestamp, filterByTime));
  const counts = Object.values(updatedDateCountsObject);

  return {
    labels,
    counts,
  };
}

export { generateData };
