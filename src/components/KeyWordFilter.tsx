import React from "react";

interface KeyWordFilterProps {}

const KeyWordFilter: React.FC<KeyWordFilterProps> = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="key-word-input">Введіть ключове слово</label>
      <input ref={inputRef} type="text" id="key-word-input" />
      <button className="btn btn_contained">Підтвердити</button>
    </form>
  );
};

export { KeyWordFilter };
