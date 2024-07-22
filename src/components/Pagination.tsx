import React from "react";
import { useDateContext } from "../hooks/useDateContext";
import { useFilterContext } from "../hooks/useFilterContext";
import { movePaginationDate } from "../utils/getNextPaginationDate";

interface PaginationProps {}

const Pagination: React.FC<PaginationProps> = () => {
  const { filterByTime } = useFilterContext();
  const { startDate, endDate, chartStartDate } = useDateContext();
  const [currentStartDate, setCurrentStartDate] = React.useState(startDate.value);
  const [currentEndDate, setCurrentEndDate] = React.useState(
    movePaginationDate(startDate.value, filterByTime.value, "next")
  );

  const isBackDisabled = currentStartDate <= startDate.value;
  const isNextDisabled = currentEndDate >= endDate.value;

  React.useEffect(() => {
    setCurrentStartDate(startDate.value);
    setCurrentEndDate(movePaginationDate(startDate.value, filterByTime.value, "next"));
  }, [startDate.value, filterByTime.value]);

  const onGoBack = () => {
    const prevStartDate = movePaginationDate(
      currentStartDate,
      filterByTime.value,
      "back"
    );
    const prevEndDate = movePaginationDate(currentEndDate, filterByTime.value, "back");

    chartStartDate.setDate(prevStartDate);
    setCurrentStartDate(prevStartDate);
    setCurrentEndDate(prevEndDate);
  };
  const onGoNext = () => {
    const nextStartDate = movePaginationDate(
      currentStartDate,
      filterByTime.value,
      "next"
    );
    const nextEndDate = movePaginationDate(currentEndDate, filterByTime.value, "next");

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
