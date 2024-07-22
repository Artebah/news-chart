import React from "react";
import { KeyWordFilter } from "./KeyWordFilter";
import { Pagination } from "./Pagination";
import { Range } from "./Range";
import { RequestsFilter } from "./RequestsFilter";

interface ActionsProps {}

const Actions: React.FC<ActionsProps> = ({}) => {
  return (
    <div className="actions">
      <Range />
      <div className="actions-right">
        <RequestsFilter />
        <KeyWordFilter />
        <Pagination />
      </div>
    </div>
  );
};

export { Actions };
