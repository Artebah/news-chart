import React from "react";
import { RequestsButton } from "./RequestsButton";
import { RequestsButtonsGroup } from "./RequestsButtonsGroup";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { useFilterContext } from "../hooks/useFilterContext";

interface RequestsFilterProps {}

const RequestsFilter: React.FC<RequestsFilterProps> = () => {
  const { requestsFilter } = useFilterContext();

  const onClick = (name: string, isActive: boolean) => {
    const updatedFilters = requestsFilter.value.map((filter) =>
      filter.name === name ? { ...filter, isActive: !isActive } : filter
    );

    requestsFilter.setFilter(updatedFilters);
  };

  return (
    <div className="requests-filter panel">
      <div className="requests-filter-buttons">
        <RequestsButton name="Запит 1" />
        <RequestsButton name="Запит 2" disabled />
        <RequestsButtonsGroup name="Група запитів 1">
          <RequestsButton grouped name="Запит 1" />
          <RequestsButton disabled grouped name="Запит 2" />
          <RequestsButton grouped name="Запит 3" />
        </RequestsButtonsGroup>
      </div>

      <button className="requests-filter-edit">
        <EditIcon />
      </button>
    </div>
  );
};

export { RequestsFilter };
