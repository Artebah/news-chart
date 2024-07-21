import { TimeFilterValues } from "../types/TimeFilterValues";

const getTimeFilterK = (filterByTime: TimeFilterValues) => {
  switch (filterByTime) {
    case "seconds":
      return 1000;
    case "minutes":
      return 1000 * 60;
    case "hours":
      return 1000 * 60 * 60;
    case "days":
      return 1000 * 60 * 60 * 24;
  }
};

export { getTimeFilterK };
