import React from "react";
import { Range } from "./Range";
import { TimeFilter } from "./TimeFilter";

interface TimeAccuracyProps {}

const TimeAccuracy: React.FC<TimeAccuracyProps> = () => {
  return (
    <div className="time-accuracy panel">
      <TimeFilter />
      <Range />
    </div>
  );
};

export { TimeAccuracy };
