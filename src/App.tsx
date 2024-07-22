import React from "react";
import { InfoBar } from "./components/InfoBar";
import { NewsChart } from "./components/NewsChart";
import { getResources } from "./helpers/getResources";
import { DataType } from "./types/DataType";
import { Request } from "./types/Request";
import { RequestFilter } from "./types/RequestFilter";
import { Resource } from "./types/Resourse";

function App() {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [requests, setRequests] = React.useState<Request[]>([]);
  const [requestFilters, setRequestFilters] = React.useState<RequestFilter[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("/data.json");
      const data: DataType = await response.json();

      const allRequestFilters = data.Requests.map((request) => ({
        name: request.Request,
        isActive: true,
      }));

      setRequests(data.Requests);
      setRequestFilters(allRequestFilters);
    };
    getData();
  }, []);

  React.useEffect(() => {
    const filteredRequests = requests.filter(
      (request, i) => requestFilters[i].isActive === true
    );

    const newResources = getResources(filteredRequests);

    setResources(newResources);
  }, [requestFilters, requests]);

  return (
    <div className="App">
      <div className="container">
        <NewsChart
          requestFilters={requestFilters}
          setRequestFilters={setRequestFilters}
          resources={resources}
        />
        <InfoBar resources={resources} />
      </div>
    </div>
  );
}

export default App;
