import React from "react";
import { TimeFilterValues } from "../types/TimeFilterValues";

interface IButtonData {
  name: string;
  value: TimeFilterValues;
}

const buttonsData: IButtonData[] = [
  { name: "Дні", value: "days" },
  { name: "Години", value: "hours" },
  { name: "Хвилини", value: "minutes" },
  { name: "Секунди", value: "seconds" },
];

interface TimeFilterProps {
  setFilterByTime: any;
  filterByTime: TimeFilterValues;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ setFilterByTime, filterByTime }) => {
  const setActiveClass = (value: TimeFilterValues) => {
    return value === filterByTime ? "active" : "";
  };

  const onButtonClick = (value: TimeFilterValues) => {
    if (value !== filterByTime) {
      setFilterByTime(value);
    }
  };

  return (
    <div className="time-filter-wrapper">
      {buttonsData.map(({ value, name }) => (
        <button
          className={"btn " + setActiveClass(value)}
          key={value}
          onClick={() => onButtonClick(value)}>
          {name}
        </button>
      ))}
    </div>
  );
};

export { TimeFilter };
