import classNames from "classnames";
import React from "react";
import { CreateRequestItem } from "./CreateRequestItem";
import { RequestsButton } from "./RequestsButton";
import { ReactComponent as ArrowIcon } from "../assets/icons/arrow.svg";
import { ReactComponent as FolderOpenSvg } from "../assets/icons/group-open.svg";
import { ReactComponent as FolderSvg } from "../assets/icons/group.svg";
import { IFilterRequest } from "../types/IFilterRequest";

interface RequestsButtonsGroupProps {
  active?: boolean;
  request: IFilterRequest;
  isEdit?: boolean;
  isEditable?: boolean;
  setIsEditable?: any;
  setEditedName?: any;
}

const RequestsButtonsGroup: React.FC<RequestsButtonsGroupProps> = ({
  request,
  isEdit,
  isEditable,
  setIsEditable,
  setEditedName,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const FolderIcon = isOpen ? FolderOpenSvg : FolderSvg;

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = e.target.value;

    setEditedName(value);
    setIsEditable(false);
  };

  return (
    <div className={classNames("group-requests", { _open: isOpen, _edit: isEdit })}>
      <button
        onClick={isEditable ? undefined : onClick}
        disabled={request.disabled}
        className={classNames("group-requests-button", {
          _active: request.active,
          _edit: isEdit,
          btn: !isEdit,
        })}>
        <span className="group-requests-button-arrow">
          <ArrowIcon />
        </span>
        <FolderIcon className="group-requests-button-folder" />
        {isEditable ? (
          <input
            className="requests-filter-input"
            onBlur={onBlur}
            defaultValue={request.name}
            type="text"
          />
        ) : (
          <span contentEditable={isEditable} className="group-requests-button-name">
            {request.name}
          </span>
        )}
      </button>

      <div className="group-requests-nested-buttons">
        {request.list?.map((nestedRequest) =>
          isEdit ? (
            <CreateRequestItem key={nestedRequest.name} request={nestedRequest} />
          ) : (
            <RequestsButton key={nestedRequest.name} grouped request={nestedRequest} />
          )
        )}
        {isEdit && (
          <button className="group-requests-nested-buttons-add btn">Додати запит</button>
        )}
      </div>
    </div>
  );
};

export { RequestsButtonsGroup };
