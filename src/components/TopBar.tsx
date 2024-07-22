import React from "react";
import { Actions } from "./Actions";
import { TimeFilter } from "./TimeFilter";

interface TopBarProps {
  filterByTime: any;
  setFilterByTime: any;
  requestFilters: any;
  setRequestFilters: any;
}

const TopBar: React.FC<TopBarProps> = ({
  filterByTime,
  setFilterByTime,
  requestFilters,
  setRequestFilters,
}) => {
  return (
    <div className="top-bar">
      <div className="filterByTime">
        <h1>Графік кількості постів</h1>
        <TimeFilter filterByTime={filterByTime} setFilterByTime={setFilterByTime} />
      </div>
      <Actions
        requestFilters={requestFilters}
        setRequestFilters={setRequestFilters}
        filterByTime={filterByTime}
      />
    </div>
  );
};

export { TopBar };
