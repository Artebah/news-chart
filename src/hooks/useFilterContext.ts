import React from "react";
import { FilterContext } from "../contexts/FilterContext";

export function useFilterContext() {
  return React.useContext(FilterContext);
}
