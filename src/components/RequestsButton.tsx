import classNames from "classnames";
import React from "react";
import { IFilterRequest } from "../types/IFilterRequest";

interface RequestsButtonProps {
  request: IFilterRequest;
  grouped?: boolean;
  isEdit?: boolean;
  isEditable?: boolean;
  setIsEditable?: any;
  setEditedName?: any;
}

const RequestsButton: React.FC<RequestsButtonProps> = ({
  request,
  grouped,
  isEdit,
  isEditable,
  setIsEditable,
  setEditedName,
}) => {
  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = e.target.value;

    setEditedName(value);
    setIsEditable(false);
  };

  return isEditable ? (
    <input
      className="requests-filter-input"
      onBlur={onBlur}
      defaultValue={request.name}
      type="text"
    />
  ) : (
    <button
      disabled={request.disabled}
      className={classNames("requests-filter-button", {
        _notActive: !request.active,
        _edit: isEdit,
        _gruped: grouped,
      })}>
      {request.name}
    </button>
  );
};

export { RequestsButton };
