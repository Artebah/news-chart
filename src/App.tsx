import React from "react";
import { ChartMain } from "./components/ChartMain";
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

const fakeRequestsFilter: IFilterRequest[] = [
  {
    name: "Group 1",
    active: true,
    deleted: false,
    disabled: false,
    list: [
      {
        name: "Sub Request 1",
        active: true,
        deleted: false,
      },
      {
        name: "Sub Request 2",
        active: true,
        deleted: false,
      },
    ],
  },
  {
    name: "Group 2",
    active: true,
    deleted: false,
    list: [
      {
        name: "Sub Request 3",
        active: true,
        deleted: false,
      },
      {
        name: "Sub Request 4",
        active: true,
        deleted: false,
      },
    ],
  },
  {
    name: "Request 1",
    active: true,
    deleted: false,
    disabled: false,
  },
  {
    name: "Request 2",
    active: true,
    deleted: false,
  },
  {
    name: "Request 3",
    active: true,
    deleted: false,
  },
  {
    name: "Request 4",
    active: true,
    deleted: false,
    disabled: false,
  },
  {
    name: "Request 5",
    active: true,
    deleted: false,
  },
  {
    name: "Request 6",
    active: true,
    deleted: false,
  },
  {
    name: "Request 7",
    active: true,
    deleted: false,
  },
  {
    name: "Request 8",
    active: true,
    deleted: false,
  },
  {
    name: "Request 9",
    active: true,
    deleted: false,
  },

  {
    name: "Group 3",
    active: true,
    deleted: false,
    list: [
      {
        name: "Sub Request 5",
        active: true,
        deleted: false,
      },
      {
        name: "Sub Request 6",
        active: true,
        deleted: false,
      },
    ],
  },
];

function App() {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [requests, setRequests] = React.useState<Request[]>([]);
  const [requestsFilter, setRequestsFilter] = React.useState<IFilterRequest[]>([]);
  const [filterByTime, setFilterByTime] = React.useState<TimeFilterValues>("days");
  const [keywordFilter, setKeywordFilter] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date(START_DATE));
  const [endDate, setEndDate] = React.useState(new Date());
  const [isLoadingResources, setIsLoadingResources] = React.useState(false);

  React.useEffect(() => {
    setIsLoadingResources(true);

    const getData = async () => {
      const response = await fetch("/dbdata.json");
      const data: DataType = await response.json();

      const allRequestsFilter = data.Requests.map(
        (request): IFilterRequest => ({
          name: request.Request,
          active: true,
          disabled: false,
          deleted: false,
        })
      );

      setRequests(data.Requests);
      //setRequestsFilter(allRequestsFilter);
      setRequestsFilter(fakeRequestsFilter);
    };

    //setInterval(getData, 5000);
    getData();

    // * test fetch data
    //fetchData(new Date("2023-04-12"), new Date(), keywordFilter);
  }, [keywordFilter]);

  React.useEffect(() => {
    const filteredRequests = requests.filter((_, i) => {
      return requestsFilter[i]?.active && !requestsFilter[i]?.deleted;
    });

    const newResources = getResources(filteredRequests);

    setResources(newResources);

    const newRequestsFilter = requestsFilter
      .filter((filter) => !filter.deleted)
      .map((filter) => {
        if (filter.list) {
          return {
            ...filter,
            list: filter.list.filter((subFilter) => !subFilter.deleted),
          };
        }
        return filter;
      });

    const needUpdate =
      newRequestsFilter.length !== requestsFilter.length ||
      !newRequestsFilter.every(
        (filter, i) => JSON.stringify(filter) === JSON.stringify(requestsFilter[i])
      );

    if (needUpdate) {
      setRequestsFilter(newRequestsFilter);
    }
  }, [requestsFilter, requests]);

  React.useEffect(() => {
    if (resources.length) {
      setIsLoadingResources(false);
    }
  }, [resources]);

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
              <main className="main">
                <ChartMain
                  isLoadingResources={isLoadingResources}
                  resources={resources}
                  startDate={startDate}
                  filterByTime={filterByTime}
                />
              </main>
            </div>
          </FilterProvider>
        </DateProvider>
      </div>
    </div>
  );
}

export default App;
