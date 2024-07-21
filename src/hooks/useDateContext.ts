import React from "react";
import { DateContext } from "../contexts/DateContext";

export function useDateContext() {
  return React.useContext(DateContext);
}
