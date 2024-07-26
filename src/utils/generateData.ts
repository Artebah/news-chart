import { binarySearch } from "../helpers/binarySearch";
import { dateToTimestamp } from "../helpers/dateToTimestamp";
import { getDataRange } from "../helpers/getDataRange";
import { getDates } from "../helpers/getDates";
import { getPosts } from "../helpers/getPosts";
import { getTimeFilterK } from "../helpers/getTimeFilterK";
import { timestampToDate } from "../helpers/timestampToDate";
import { Resource } from "../types/Resourse";
import { TimeFilterValues } from "../types/TimeFilterValues";
//import { PAGINATION_LIMIT } from "../constants";
//import { getDataLimit } from "../helpers/getDataLimit";
//import { timestampToDate } from "../helpers/timestampToDate";
//import { InitDates } from "../types/InitDates";
//import { TimeFilterValues } from "../types/TimeFilterValues";

function generateData(
  resources: Resource[],
  filterByTime: TimeFilterValues,
  startDateStr: string
) {
  // * замер времени
  const counter = new Date();

  const timestamps = resources.flatMap(
    (resource) =>
      resource.Posts.map((post) => dateToTimestamp(post.pub_date, filterByTime))
    //resource.Posts.map((post) => post.pub_date)
  );
  timestamps.sort((a, b) => a - b);

  const dataRange = getDataRange(filterByTime, timestamps);
  const timeFilterK = getTimeFilterK(filterByTime);

  //const timestampsInDates = timestamps.map((t) => timestampToDate(t, filterByTime));
  //console.log("timestamps In Dates: ", timestampsInDates);
  const startElementIndex = binarySearch(
    timestamps,
    dateToTimestamp(startDateStr, filterByTime)
  );
  const startTimestamp = timestamps[startElementIndex];
  const endTimestamp = startTimestamp + dataRange;

  let result: [number, number][] = [];
  let postCounts: { [key: number]: number } = {};

  //* Підрахунок постів
  timestamps.forEach((timestamp) => {
    postCounts[timestamp] = (postCounts[timestamp] || 0) + 1;
  });

  //* Генерація даних
  for (let time = startTimestamp; time < endTimestamp; time += timeFilterK) {
    const count = postCounts[time] || 0;
    result.push([time, count]);
  }

  // * замер времени
  console.log("diff: ", (new Date().getTime() - counter.getTime()) / 1000);
  return result;
}

export { generateData };
