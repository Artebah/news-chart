import React from "react";
import { useFilterContext } from "../hooks/useFilterContext";

interface RequestsFilterProps {}

const RequestsFilter: React.FC<RequestsFilterProps> = ({}) => {
  const { requestFilters } = useFilterContext();

  const onClick = (name: string, isActive: boolean) => {
    const updatedFilters = requestFilters.value.map((filter) =>
      filter.name === name ? { ...filter, isActive: !isActive } : filter
    );

    requestFilters.setFilter(updatedFilters);
  };

  return (
    <div className="requests-filter">
      <h2>Фільтр запитів</h2>
      <div className="requests-filter-buttons">
        {requestFilters.value.map(({ isActive, name }) => (
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
