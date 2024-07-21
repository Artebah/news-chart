import React from "react";
import { Pagination } from "./Pagination";
import { Range } from "./Range";

interface ActionsProps {
  filterByTime: any;
}

const Actions: React.FC<ActionsProps> = ({ filterByTime }) => {
  return (
    <div className="actions">
      <Range />
      <Pagination filterByTime={filterByTime} />
    </div>
  );
};

export { Actions };
