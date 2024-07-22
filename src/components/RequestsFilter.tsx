import React from "react";
import { RequestFilter } from "../types/RequestFilter";

interface RequestsFilterProps {
  requestFilters: RequestFilter[];
  setRequestFilters: any;
}

const RequestsFilter: React.FC<RequestsFilterProps> = ({
  requestFilters,
  setRequestFilters,
}) => {
  const onClick = (name: string, isActive: boolean) => {
    const updatedFilters = requestFilters.map((filter) =>
      filter.name === name ? { ...filter, isActive: !isActive } : filter
    );

    setRequestFilters(updatedFilters);
  };

  return (
    <div className="requests-filter">
      <h2>Фільтр запитів</h2>
      <div className="requests-filter-buttons">
        {requestFilters.map(({ isActive, name }) => (
          <button
            onClick={() => onClick(name, isActive)}
            key={name}
            className={
              "requests-filter-button btn btn_contained " + (!isActive ? "notActive" : "")
            }>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export { RequestsFilter };
