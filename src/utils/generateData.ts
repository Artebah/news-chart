import { binarySearch } from "../helpers/binarySearch";
import { dateToTimestamp } from "../helpers/dateToTimestamp";
import { getDataRange } from "../helpers/getDataRange";
import { getTimeFilterK } from "../helpers/getTimeFilterK";
import { GeneratedData } from "../types/GeneratedData";
import { Resource } from "../types/Resourse";
import { TimeFilterValues } from "../types/TimeFilterValues";

function generateData(
  resources: Resource[],
  filterByTime: TimeFilterValues,
  startDateStr: string
) {
  const counter = new Date();

  const groupedTimestamps: { [key: number]: number[] } = {};
  const postCounts: { [key: number]: Map<number, number> } = {};

  resources.forEach((resource) => {
    const resourceID = resource.ResourceID - 1;

    if (!groupedTimestamps[resourceID]) {
      groupedTimestamps[resourceID] = [];
      postCounts[resourceID] = new Map<number, number>();
    }

    resource.Posts.forEach((post) => {
      const timestamp = dateToTimestamp(post.pub_date, filterByTime);

      groupedTimestamps[resourceID].push(timestamp);
      postCounts[resourceID].set(
        timestamp,
        (postCounts[resourceID].get(timestamp) || 0) + 1
      );
    });
  });

  const result: GeneratedData = [[], [], [], [], []];

  Object.keys(groupedTimestamps).forEach((resourceID) => {
    const timestamps = groupedTimestamps[+resourceID].sort((a, b) => a - b);
    const dataRange = getDataRange(filterByTime, timestamps);
    const timeFilterK = getTimeFilterK(filterByTime);

    const startElementIndex = binarySearch(
      timestamps,
      dateToTimestamp(startDateStr, filterByTime)
    );
    const startTimestamp = timestamps[startElementIndex];
    const endTimestamp = startTimestamp + dataRange;

    let resourceResult: [number, number][] = [];

    for (let time = startTimestamp; time < endTimestamp; time += timeFilterK) {
      const count = postCounts[+resourceID].get(time) || 0;
      resourceResult.push([time, count]);
    }

    result[+resourceID] = resourceResult;
  });

  console.log("diff: ", (new Date().getTime() - counter.getTime()) / 1000);
  return result;
}

export { generateData };
