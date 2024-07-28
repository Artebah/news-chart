import React from "react";
import { Highchart } from "./Highchart";
import { RequestsFilter } from "./RequestsFilter";
import { TimeAccuracy } from "./TimeAccuracy";
import { formatDate } from "../helpers/formatDate";
import { Resource } from "../types/Resourse";
import { generateData } from "../utils/generateData";

interface ChartMainProps {
  resources: Resource[];
  isLoadingResources: boolean;
  filterByTime: any;
  startDate: any;
}

const ChartMain: React.FC<ChartMainProps> = ({
  resources,
  filterByTime,
  startDate,
  isLoadingResources,
}) => {
  const [openEditRequestsMenu, setOpenEditRequestsMenu] = React.useState(false);

  //React.useEffect(() => {
  //  const data = generateData(resources, filterByTime, formatDate(startDate, "full"));

  //  console.log(data);
  //}, [filterByTime, resources, startDate]);
  //console.log(isLoadingResources);

  console.log(!resources.length && !isLoadingResources && <h2>Немає даних :(</h2>);

  return (
    <div className="chart-main">
      <RequestsFilter
        setOpenEditRequestsMenu={setOpenEditRequestsMenu}
        openEditRequestsMenu={openEditRequestsMenu}
      />
      <TimeAccuracy />
      {isLoadingResources && <h2>Завантажуємо дані, зачекайте...</h2>}
      {!resources.length && !isLoadingResources && <h2>Немає даних :(</h2>}

      {resources.length && !openEditRequestsMenu && !isLoadingResources ? (
        <Highchart
          groupedData={generateData(
            resources,
            filterByTime,
            formatDate(startDate, "full")
          )}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export { ChartMain };
