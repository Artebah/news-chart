import React from "react";
import { areDatesValide } from "../helpers/areDatesValide";
import { useDateContext } from "../hooks/useDateContext";

interface RangeProps {}

const Range: React.FC<RangeProps> = () => {
  const startDateInputRef = React.useRef<HTMLInputElement>(null);
  const endDateInputRef = React.useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { startDate, endDate, chartStartDate } = useDateContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startDateInputValue = startDateInputRef.current?.value;
    const endDateInputValue = endDateInputRef.current?.value;

    if (startDateInputValue && endDateInputValue) {
      setErrorMessage(null);
      if (areDatesValide(startDateInputValue, endDateInputValue)) {
        chartStartDate.setDate(startDateInputValue);
        startDate.setDate(startDateInputValue);
        endDate.setDate(endDateInputValue);
      } else {
        setErrorMessage("Incorrect dates");
      }
    }
  };

  return (
    <div className="range">
      <p className="range-title">Вибрати часовий діапазон:</p>
      <form onSubmit={handleSubmit}>
        <div className="range-inputs">
          <label htmlFor="startDateInput"></label>
          <input
            className="input"
            defaultValue={startDate.value}
            ref={startDateInputRef}
            name="dateInput"
            id="startDateInput"
            type="text"
            placeholder="Початкова дата"
          />

          <label htmlFor="endDateInput"></label>
          <input
            className="input"
            defaultValue={endDate.value}
            ref={endDateInputRef}
            name="dateInput"
            id="endDateInput"
            type="text"
            placeholder="Кінцева дата"
          />
        </div>
        <p className="range-input-tip">
          <span>Формат:</span> year-month-day hours:minutes:seconds
        </p>
        <button className="range-button btn btn_contained" type="submit">
          Підтвердити
        </button>
        {errorMessage && <p className="range-error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export { Range };
