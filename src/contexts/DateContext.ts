import React from "react";

interface IDateContext {
  startDate: {
    setDate: any;
    value: any;
  };
  endDate: {
    setDate: any;
    value: any;
  };
}

export const DateContext = React.createContext<IDateContext>({
  startDate: {
    setDate: null,
    value: null,
  },
  endDate: {
    setDate: null,
    value: null,
  },
});

export const DateProvider = DateContext.Provider;
