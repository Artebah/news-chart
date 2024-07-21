import React from "react";
import { useDateContext } from "../hooks/useDateContext";
import { TimeFilterValues } from "../types/TimeFilterValues";
import { movePaginationDate } from "../utils/getNextPaginationDate";

interface PaginationProps {
  filterByTime: TimeFilterValues;
}

const Pagination: React.FC<PaginationProps> = ({ filterByTime }) => {
  const { startDate, endDate, chartStartDate } = useDateContext();
  const [currentStartDate, setCurrentStartDate] = React.useState(startDate.value);
  const [currentEndDate, setCurrentEndDate] = React.useState(
    movePaginationDate(startDate.value, filterByTime, "next")
  );

  const isBackDisabled = currentStartDate <= startDate.value;
  const isNextDisabled = currentEndDate >= endDate.value;

  React.useEffect(() => {
    setCurrentStartDate(startDate.value);
    setCurrentEndDate(movePaginationDate(startDate.value, filterByTime, "next"));
  }, [startDate.value, filterByTime]);

  const onGoBack = () => {
    const prevStartDate = movePaginationDate(currentStartDate, filterByTime, "back");
    const prevEndDate = movePaginationDate(currentEndDate, filterByTime, "back");

    chartStartDate.setDate(prevStartDate);
    setCurrentStartDate(prevStartDate);
    setCurrentEndDate(prevEndDate);
  };
  const onGoNext = () => {
    const nextStartDate = movePaginationDate(currentStartDate, filterByTime, "next");
    const nextEndDate = movePaginationDate(currentEndDate, filterByTime, "next");

    chartStartDate.setDate(nextStartDate);
    setCurrentStartDate(nextStartDate);
    setCurrentEndDate(nextEndDate);
  };

  return (
    <div className="pagination">
      <h3>Поточний проміжок:</h3>
      <p className="pagination-range">
        <span>{currentStartDate}</span> <span>{currentEndDate}</span>
      </p>
      <div className="pagination-buttons">
        <button
          disabled={isBackDisabled}
          onClick={onGoBack}
          className="btn btn_contained">
          Назад
        </button>
        <button
          disabled={isNextDisabled}
          onClick={onGoNext}
          className="btn btn_contained">
          Вперед
        </button>
      </div>
    </div>
  );
};

export { Pagination };
