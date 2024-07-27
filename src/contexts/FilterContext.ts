import React from "react";
import { IFilterRequest } from "../types/IFilterRequest";
import { TimeFilterValues } from "../types/TimeFilterValues";

interface IFilterContext {
  requestsFilter: {
    setFilter: any;
    value: IFilterRequest[];
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
  requestsFilter: {
    setFilter: null,
    value: [],
  },
  keywordFilter: {
    setFilter: null,
    value: "",
  },
  filterByTime: {
    setFilter: null,
    value: "days",
  },
});

export const FilterProvider = FilterContext.Provider;
