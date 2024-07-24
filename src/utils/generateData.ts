import { dateToTimestamp } from "../helpers/dateToTimestamp";
import { getDataRange } from "../helpers/getDataRange";
import { getDates } from "../helpers/getDates";
import { getPosts } from "../helpers/getPosts";
import { getTimeFilterK } from "../helpers/getTimeFilterK";
import { timestampToDate } from "../helpers/timestampToDate";
import { Resource } from "../types/Resourse";
import { TimeFilterValues } from "../types/TimeFilterValues";
//import { PAGINATION_LIMIT } from "../constants";
//import { binarySearch } from "../helpers/binarySearch";
//import { getDataLimit } from "../helpers/getDataLimit";
//import { timestampToDate } from "../helpers/timestampToDate";
//import { InitDates } from "../types/InitDates";
//import { TimeFilterValues } from "../types/TimeFilterValues";

function generateData(resources: Resource[], filterByTime: TimeFilterValues) {
  // * замер времени
  const startTime = new Date();

  const posts = getPosts(resources);
  const dates = getDates(posts);
  const timestamps = dates.map((date) => dateToTimestamp(date, filterByTime));
  timestamps.sort((a, b) => a - b);

  const dataRange = getDataRange(filterByTime, timestamps);
  const timeFilterK = getTimeFilterK(filterByTime);

  const timestampsInDates = timestamps.map((t) => timestampToDate(t, filterByTime));
  //console.log("timestamps In Dates: ", timestampsInDates);

  const startTimestamp = timestamps[0];
  const endTimestamp = startTimestamp + dataRange;

  let result: [number, number][] = [];
  let postCounts: { [key: number]: number } = {};

  //console.log("postCounts: ", postCounts);

  //* Підрахунок постів
  timestamps.forEach((timestamp) => {
    postCounts[timestamp] = (postCounts[timestamp] || 0) + 1;
  });

  //* Генерація даних
  for (let time = startTimestamp; time < endTimestamp; time += timeFilterK) {
    const count = postCounts[time] || 0;
    result.push([time, count]);
    //result.push([timestampToDate(time, filterByTime), count]);
  }

  // * замер времени
  console.log("diff: ", (new Date().getTime() - startTime.getTime()) / 1000);
  //console.log("result: ", result);
  return result;
}

export { generateData };
