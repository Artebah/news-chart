import React from "react";
import { useFilterContext } from "../hooks/useFilterContext";
import { TimeFilterValues } from "../types/TimeFilterValues";

interface IButtonData {
  name: string;
  value: TimeFilterValues;
}

const buttonsData: IButtonData[] = [
  { name: "Секунди", value: "seconds" },
  { name: "Хвилини", value: "minutes" },
  { name: "Години", value: "hours" },
  { name: "Дні", value: "days" },
  //{ name: "Місяці", value: "months" },
  //{ name: "Роки", value: "years" },
];

interface TimeFilterProps {}

const TimeFilter: React.FC<TimeFilterProps> = () => {
  const { filterByTime } = useFilterContext();

  const setActiveClass = (value: TimeFilterValues) => {
    return value === filterByTime.value ? "_active" : "";
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
          className={"time-filter-button " + setActiveClass(value)}
          key={value}
          onClick={() => onButtonClick(value)}>
          {name}
        </button>
      ))}
    </div>
  );
};

export { TimeFilter };
