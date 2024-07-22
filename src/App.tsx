import React from "react";
import { InfoBar } from "./components/InfoBar";
import { NewsChart } from "./components/NewsChart";

function App() {
  const [resources, setResources] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("/data.json");
      const data = await response.json();

      setResources(data.Requests[0].Resources);
    };
    getData();
  }, []);

  if (!resources) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <NewsChart resources={resources} />
        <InfoBar resources={resources} />
      </div>
    </div>
  );
}

export default App;
