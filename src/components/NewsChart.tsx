import React from "react";
import { CustomLine } from "./CustomLine";
import { TopBar } from "./TopBar";
import { START_DATE } from "../constants";
import { DateProvider } from "../contexts/DateContext";
import { formatDate } from "../helpers/formatDate";
import { Resource } from "../types/Resourse";
import { TimeFilterValues } from "../types/TimeFilterValues";
import { generateData } from "../utils/generateData";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

interface NewsChartProps {
  resources: Resource[];
}

const NewsChart: React.FC<NewsChartProps> = ({ resources }) => {
  const [startDate, setStartDate] = React.useState(formatDate(START_DATE));
  const [endDate, setEndDate] = React.useState(formatDate(new Date()));
  const [filterByTime, setFilterByTime] = React.useState<TimeFilterValues>("seconds");
  const [chartStartDate, setChartStartDate] = React.useState(formatDate(START_DATE));

  return (
    <DateProvider
      value={{
        startDate: { setDate: setStartDate, value: startDate },
        endDate: { setDate: setEndDate, value: endDate },
        chartStartDate: { setDate: setChartStartDate, value: chartStartDate },
      }}>
      <div className="container">
        <TopBar filterByTime={filterByTime} setFilterByTime={setFilterByTime} />
        <CustomLine {...generateData(resources, filterByTime, chartStartDate)} />
      </div>
    </DateProvider>
  );
};

export { NewsChart };
