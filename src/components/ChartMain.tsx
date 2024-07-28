import React from "react";
import { Highchart } from "./Highchart";
import { RequestsFilter } from "./RequestsFilter";
import { TimeAccuracy } from "./TimeAccuracy";
import { formatDate } from "../helpers/formatDate";
import { generateData } from "../utils/generateData";

interface ChartMainProps {
  resources: any;
  filterByTime: any;
  startDate: any;
}

const ChartMain: React.FC<ChartMainProps> = ({ resources, filterByTime, startDate }) => {
  const [openEditRequestsMenu, setOpenEditRequestsMenu] = React.useState(false);

  React.useEffect(() => {
    const data = generateData(resources, filterByTime, formatDate(startDate, "full"));

    console.log(data);
  }, [filterByTime, resources, startDate]);

  return (
    <div className="chart-main">
      <RequestsFilter
        setOpenEditRequestsMenu={setOpenEditRequestsMenu}
        openEditRequestsMenu={openEditRequestsMenu}
      />
      <TimeAccuracy />
      {!openEditRequestsMenu && (
        <Highchart
          groupedData={generateData(
            resources,
            filterByTime,
            formatDate(startDate, "full")
          )}
        />
      )}
    </div>
  );
};

export { ChartMain };
