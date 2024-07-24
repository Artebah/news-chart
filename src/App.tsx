import React from "react";
import { InfoBar } from "./components/InfoBar";
import { NewsChart } from "./components/NewsChart";
import { FilterProvider } from "./contexts/FilterContext";
import { filterDataByKeyword } from "./helpers/filterDataByKeyword";
import { getResources } from "./helpers/getResources";
import { DataType } from "./types/DataType";
import { Request } from "./types/Request";
import { RequestFilter } from "./types/RequestFilter";
import { Resource } from "./types/Resourse";
import { TimeFilterValues } from "./types/TimeFilterValues";

function App() {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [requests, setRequests] = React.useState<Request[]>([]);
  const [requestFilters, setRequestFilters] = React.useState<RequestFilter[]>([]);
  const [filterByTime, setFilterByTime] = React.useState<TimeFilterValues>("days");
  const [keywordFilter, setKeywordFilter] = React.useState("");

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("/data.json");
      const data: DataType = await response.json();
      console.log("current data: ", data);
      const allRequestFilters = data.Requests.map((request) => ({
        name: request.Request,
        isActive: true,
      }));

      setRequests(data.Requests);
      setRequestFilters(allRequestFilters);
    };

    fetch("/realData.json")
      .then((res) => res.json())
      .then((data) => console.log("real data: ", data));

    getData();
  }, []);

  React.useEffect(() => {
    const filteredRequests = requests.filter(
      (_, i) => requestFilters[i].isActive === true
    );

    const newResources = getResources(filteredRequests);

    setResources(newResources);
  }, [requestFilters, requests]);

  React.useEffect(() => {
    const newResources = filterDataByKeyword(requests, keywordFilter);

    setResources(newResources);
  }, [requests, keywordFilter]);

  return (
    <div className="App">
      <div className="container">
        <FilterProvider
          value={{
            filterByTime: { setFilter: setFilterByTime, value: filterByTime },
            keywordFilter: { setFilter: setKeywordFilter, value: keywordFilter },
            requestFilters: { setFilter: setRequestFilters, value: requestFilters },
          }}>
          {!resources.length ? (
            <h2>Завантажуємо дані...</h2>
          ) : (
            <>
              <NewsChart resources={resources} />
              <InfoBar resources={resources} />
            </>
          )}
        </FilterProvider>
      </div>
    </div>
  );
}

export default App;
