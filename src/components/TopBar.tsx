import React from "react";
import { Actions } from "./Actions";
import { TimeFilter } from "./TimeFilter";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = ({}) => {
  return (
    <div className="top-bar">
      <div className="filterByTime">
        <h1>Графік кількості постів</h1>
        <TimeFilter />
      </div>
      <Actions />
    </div>
  );
};

export { TopBar };
