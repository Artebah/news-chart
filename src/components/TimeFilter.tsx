import React from "react";
import { useFilterContext } from "../hooks/useFilterContext";
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

interface TimeFilterProps {}

const TimeFilter: React.FC<TimeFilterProps> = ({}) => {
  const { filterByTime } = useFilterContext();

  const setActiveClass = (value: TimeFilterValues) => {
    return value === filterByTime.value ? "active" : "";
  };

  const onButtonClick = (value: TimeFilterValues) => {
    if (value !== filterByTime.value) {
      filterByTime.setFilter(value);
    }
  };

  return (
    <div className="time-filter">
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
