import React from "react";
import { ChartMain } from "./components/ChartMain";
import { getResources } from "./helpers/getResources";
import { DataType } from "./types/DataType";
import { Request } from "./types/Request";
import { RequestFilter } from "./types/RequestFilter";
import { Resource } from "./types/Resourse";
import { TimeFilterValues } from "./types/TimeFilterValues";
import { fetchData } from "./utils/fetchData";
//import { InfoBar } from "./components/InfoBar";
//import { NewsChart } from "./components/NewsChart";
//import { FilterProvider } from "./contexts/FilterContext";

function App() {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [requests, setRequests] = React.useState<Request[]>([]);
  const [requestsFilter, setRequestsFilter] = React.useState<RequestFilter[]>([]);
  const [filterByTime, setFilterByTime] = React.useState<TimeFilterValues>("days");
  const [keywordFilter, setKeywordFilter] = React.useState("");

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("/data.json");
      const data: DataType = await response.json();

      const allRequestsFilter = data.Requests.map((request) => ({
        name: request.Request,
        isActive: true,
      }));

      setRequests(data.Requests);
      setRequestsFilter(allRequestsFilter);
    };
    getData();

    // * test fetch data
    //fetchData(new Date("2023-04-12"), new Date(), keywordFilter);
  }, [keywordFilter]);

  React.useEffect(() => {
    const filteredRequests = requests.filter(
      (_, i) => requestsFilter[i].isActive === true
    );

    const newResources = getResources(filteredRequests);

    setResources(newResources);
  }, [requestsFilter, requests]);

  return (
    <div className="App">
      <div className="container">
        <h1>WorldNews</h1>
        <div className="layout">
          <aside className="sidebar"></aside>
          <main className="main">
            {!resources.length ? (
              <h2>Завантажуємо дані...</h2>
            ) : (
              <ChartMain resources={resources} filterByTime={filterByTime} />
            )}
          </main>
        </div>

        {/*<FilterProvider
            value={{
              filterByTime: { setFilter: setFilterByTime, value: filterByTime },
              keywordFilter: { setFilter: setKeywordFilter, value: keywordFilter },
              requestsFilter: { setFilter: setRequestsFilter, value: requestsFilter },
            }}>
              <></>
          </FilterProvider>*/}
      </div>
    </div>
  );
}

export default App;
