import React from "react";
import { useFilterContext } from "../hooks/useFilterContext";

interface KeyWordFilterProps {}

const KeyWordFilter: React.FC<KeyWordFilterProps> = () => {
  const { keywordFilter } = useFilterContext();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = inputRef.current?.value;

    if (typeof value === "string") {
      keywordFilter.setFilter(value.trim());
    }
  };

  return (
    <form className="keyword-filter" onSubmit={onSubmit}>
      <h2 className="keyword-filter-title">Фільтр по ключовому слову</h2>
      <input
        className="input"
        ref={inputRef}
        placeholder="Введіть ключове слово"
        type="text"
        id="key-word-input"
      />
      <button type="submit" className="btn btn_contained">
        Підтвердити
      </button>
    </form>
  );
};

export { KeyWordFilter };
