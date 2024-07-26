import React from "react";
import { ChartMain } from "./components/ChartMain";
import { Sidebar } from "./components/Sidebar";
import { START_DATE } from "./constants";
import { DateProvider } from "./contexts/DateContext";
import { FilterProvider } from "./contexts/FilterContext";
import { formatDate } from "./helpers/formatDate";
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
  const [startDate, setStartDate] = React.useState(new Date(START_DATE));
  const [endDate, setEndDate] = React.useState(new Date());

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("/realData.json");
      const data: DataType = await response.json();

      const allRequestsFilter = data.Requests.map((request) => ({
        name: request.Request,
        isActive: true,
      }));
      //console.log(allRequestsFilter);
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
        <DateProvider
          value={{
            startDate: { setDate: setStartDate, value: startDate },
            endDate: { setDate: setEndDate, value: endDate },
          }}>
          <FilterProvider
            value={{
              filterByTime: { setFilter: setFilterByTime, value: filterByTime },
              keywordFilter: { setFilter: setKeywordFilter, value: keywordFilter },
              requestsFilter: { setFilter: setRequestsFilter, value: requestsFilter },
            }}>
            <h1>WorldNews</h1>
            <div className="layout">
              <Sidebar />
              <main className="main">
                {!resources.length ? (
                  <h2>Завантажуємо дані...</h2>
                ) : (
                  <ChartMain
                    resources={resources}
                    startDate={startDate}
                    filterByTime={filterByTime}
                  />
                )}
              </main>
            </div>
          </FilterProvider>
        </DateProvider>
      </div>
    </div>
  );
}

export default App;
