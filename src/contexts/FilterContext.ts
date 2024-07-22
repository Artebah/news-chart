import React from "react";
import { RequestFilter } from "../types/RequestFilter";
import { TimeFilterValues } from "../types/TimeFilterValues";

interface IFilterContext {
  requestFilters: {
    setFilter: any;
    value: RequestFilter[];
  };
  keywordFilter: {
    setFilter: any;
    value: string;
  };
  filterByTime: {
    setFilter: any;
    value: TimeFilterValues;
  };
}

export const FilterContext = React.createContext<IFilterContext>({
  requestFilters: {
    setFilter: null,
    value: [],
  },
  keywordFilter: {
    setFilter: null,
    value: "",
  },
  filterByTime: {
    setFilter: null,
    value: "seconds",
  },
});

export const FilterProvider = FilterContext.Provider;
