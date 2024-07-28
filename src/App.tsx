import React from "react";
import { ChartMain } from "./components/ChartMain";
import { Sidebar } from "./components/Sidebar";
import { START_DATE } from "./constants";
import { DateProvider } from "./contexts/DateContext";
import { FilterProvider } from "./contexts/FilterContext";
import { getResources } from "./helpers/getResources";
import { DataType } from "./types/DataType";
import { IFilterRequest } from "./types/IFilterRequest";
import { Request } from "./types/Request";
import { Resource } from "./types/Resourse";
import { TimeFilterValues } from "./types/TimeFilterValues";
//import { fetchData } from "./utils/fetchData";
//import { InfoBar } from "./components/InfoBar";
//import { NewsChart } from "./components/NewsChart";
//import { FilterProvider } from "./contexts/FilterContext";

//const fakeRequestsFilter: IFilterRequest[] = [
//  {
//    name: "Request 1",
//    active: true,
//    deleted: false,
//    disabled: false,
//    list: [
//      {
//        name: "Sub Request 1",
//        active: true,
//        deleted: false,
//      },
//      {
//        name: "Sub Request 2",
//        active: false,
//        deleted: true,
//      },
//    ],
//  },
//  {
//    name: "Request 2",
//    active: false,
//    deleted: true,
//    list: [
//      {
//        name: "Sub Request 3",
//        active: true,
//        deleted: false,
//      },
//    ],
//  },
//  {
//    name: "Request 3",
//    active: true,
//    deleted: false,
//    disabled: true,
//  },
//  {
//    name: "Request 4",
//    active: false,
//    deleted: false,
//  },
//  {
//    name: "Request 5",
//    active: true,
//    deleted: true,
//  },
//  {
//    name: "Request 6",
//    active: false,
//    deleted: false,
//    disabled: true,
//  },
//  {
//    name: "Request 7",
//    active: true,
//    deleted: false,
//  },
//];

function App() {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [requests, setRequests] = React.useState<Request[]>([]);
  const [requestsFilter, setRequestsFilter] = React.useState<IFilterRequest[]>([]);
  const [filterByTime, setFilterByTime] = React.useState<TimeFilterValues>("days");
  const [keywordFilter, setKeywordFilter] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date(START_DATE));
  const [endDate, setEndDate] = React.useState(new Date());

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("/dbdata.json");
      const data: DataType = await response.json();

      console.log(data);

      const allRequestsFilter = data.Requests.map(
        (request): IFilterRequest => ({
          name: request.Request,
          active: true,
          disabled: false,
          deleted: false,
        })
      );

      setRequests(data.Requests);
      setRequestsFilter(allRequestsFilter);
      //setRequestsFilter(fakeRequestsFilter);
    };
    getData();

    // * test fetch data
    //fetchData(new Date("2023-04-12"), new Date(), keywordFilter);
  }, [keywordFilter]);

  React.useEffect(() => {
    const filteredRequests = requests.filter((_, i) => {
      return requestsFilter[i]?.active === true && requestsFilter[i]?.deleted === false;
    });

    const newResources = getResources(filteredRequests);

    setResources(newResources);

    if (requestsFilter.length) {
      const newRequestsFilter = requestsFilter.filter(
        (request) => request.deleted === false
      );

      if (newRequestsFilter.length !== requestsFilter.length) {
        setRequestsFilter(newRequestsFilter);
      }
    }
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
