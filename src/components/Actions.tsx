import React from "react";
import { Pagination } from "./Pagination";
import { Range } from "./Range";
import { RequestsFilter } from "./RequestsFilter";

interface ActionsProps {
  filterByTime: any;
  requestFilters: any;
  setRequestFilters: any;
}

const Actions: React.FC<ActionsProps> = ({
  filterByTime,
  requestFilters,
  setRequestFilters,
}) => {
  return (
    <div className="actions">
      <Range />
      <div className="actions-right">
        <RequestsFilter
          requestFilters={requestFilters}
          setRequestFilters={setRequestFilters}
        />
        <Pagination filterByTime={filterByTime} />
      </div>
    </div>
  );
};

export { Actions };
