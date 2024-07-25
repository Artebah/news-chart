import React from "react";

interface RequestsButtonProps {
  name: string;
  grouped?: boolean;
  disabled?: boolean;
}

const RequestsButton: React.FC<RequestsButtonProps> = ({ name, grouped, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={"requests-filter-button btn" + (grouped ? "_grouped" : "")}>
      {name}
    </button>
  );
};

export { RequestsButton };
