import React from "react";
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
      <NewsChart resources={resources} />
    </div>
  );
}

export default App;
