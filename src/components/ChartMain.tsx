import React from "react";
import { Highchart } from "./Highchart";
import { RequestsFilter } from "./RequestsFilter";
import { generateData } from "../utils/generateData";

interface ChartMainProps {
  resources: any;
  filterByTime: any;
}

const ChartMain: React.FC<ChartMainProps> = ({ resources, filterByTime }) => {
  return (
    <div className="chart-main">
      <RequestsFilter />
      <Highchart data={generateData(resources, filterByTime)} />
    </div>
  );
};

export { ChartMain };
