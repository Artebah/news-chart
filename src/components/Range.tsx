import React from "react";
import { START_DATE } from "../constants";
import { areDatesValide } from "../helpers/areDatesValide";
import { formatDate } from "../helpers/formatDate";
import { useDateContext } from "../hooks/useDateContext";

interface RangeProps {}

const Range: React.FC<RangeProps> = () => {
  const { startDate, endDate } = useDateContext();

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    startDate.setDate(e.target.value);
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    endDate.setDate(e.target.value);
  };

  return (
    <div className="range">
      <input
        className="range-input"
        onChange={handleStartDate}
        min={START_DATE}
        value={formatDate(startDate.value, "byDay")}
        name="dateInput"
        type="date"
      />
      <span className="range-arrow">→</span>
      <input
        className="range-input"
        onChange={handleEndDate}
        value={formatDate(endDate.value, "byDay")}
        name="dateInput"
        type="date"
      />
    </div>
  );
};

export { Range };
