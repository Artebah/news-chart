import classNames from "classnames";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CreateRequestItem } from "./CreateRequestItem";
import { ReactComponent as ArrowIcon } from "../assets/icons/arrow.svg";
import { ReactComponent as FolderOpenSvg } from "../assets/icons/group-open.svg";
import { ReactComponent as FolderSvg } from "../assets/icons/group.svg";
import { getChangedRequestsFilter } from "../helpers/getChangedRequestsFilter";
import { useFilterContext } from "../hooks/useFilterContext";
import { IFilterRequest, IFilterRequestMain } from "../types/IFilterRequest";

interface RequestsButtonProps {
  request: IFilterRequest;
  isGroup?: boolean;
  isEdit?: boolean;
  isEditable?: boolean;
  setIsEditable?: any;
  isNewRequest?: boolean;
  setIsNewRequest?: any;
}

const RequestsButton: React.FC<RequestsButtonProps> = ({
  request,
  isGroup,
  isEdit,
  isEditable,
  setIsEditable,
  isNewRequest,
  setIsNewRequest,
}) => {
  const { requestsFilter } = useFilterContext();
  const [isActive, setIsActive] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);

  const FolderIcon = isOpen ? FolderOpenSvg : FolderSvg;

  // changing filter's name
  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const updatedName = e.target.value;

    if (updatedName) {
      const newRequestsFilter = getChangedRequestsFilter(
        requestsFilter.value,
        request.name,
        {
          name: updatedName,
        }
      );

      requestsFilter.setFilter(newRequestsFilter);
    }

    setIsEditable(false);
  };

  // toggling filter active
  React.useEffect(() => {
    setIsActive(request.active);
  }, [request.active]);

  const onToggleActive = () => {
    const newActive = !isActive;

    const newRequestsFilter = getChangedRequestsFilter(
      requestsFilter.value,
      request.name,
      {
        active: newActive,
      }
    );

    requestsFilter.setFilter(newRequestsFilter);
  };

  // open filters group
  const onOpenGroup = () => {
    setIsOpen(!isOpen);
  };

  const addNewSubRequest = () => {
    if (request.list) {
      const requestListLength = request.list.length;

      const newSubRequest: IFilterRequestMain = {
        name: request.name + " новий під-запит " + requestListLength,
        active: true,
        deleted: false,
        disabled: false,
      };

      const updatedRequestsFilter = requestsFilter.value.map((filterRequest) => {
        if (filterRequest.name === request.name && filterRequest.list) {
          return {
            ...filterRequest,
            list: [...filterRequest.list, newSubRequest],
          };
        }
        return filterRequest;
      });

      requestsFilter.setFilter(updatedRequestsFilter);
    }
  };

  return (
    <div
      className={classNames("requests-filter", {
        "group-requests": isGroup,
        _edit: isEdit,
        _open: isOpen,
      })}>
      <button
        onClick={!isGroup && !isEditable ? onToggleActive : undefined}
        disabled={request.disabled}
        className={classNames("requests-filter-button", {
          _notActive: !request.active,
          btn: !isEdit,
          "group-requests-button": isGroup,
        })}>
        {isGroup && (
          <span className="group-requests-button-icons" onClick={onOpenGroup}>
            <span className="group-requests-button-arrow">
              <ArrowIcon />
            </span>
            <FolderIcon className="group-requests-button-folder" />
          </span>
        )}
        {isEditable ? (
          <input
            autoFocus={isEdit}
            className="requests-filter-input"
            onBlur={onBlur}
            defaultValue={request.name}
            type="text"
          />
        ) : (
          <span onClick={onToggleActive} contentEditable={isEditable}>
            {request.name}
          </span>
        )}
      </button>

      {isGroup && (
        <div className="group-requests-nested-buttons">
          {isEdit && (
            <button
              onClick={addNewSubRequest}
              className="group-requests-nested-buttons-add btn">
              Додати запит
            </button>
          )}
          {request.list?.map((nestedRequest, index) =>
            isEdit ? (
              <Draggable
                key={nestedRequest.name}
                draggableId={nestedRequest.name}
                index={index}>
                {(provided) => (
                  <CreateRequestItem
                    key={nestedRequest.name}
                    request={nestedRequest}
                    dndProps={{
                      ref: provided.innerRef,
                      draggableProps: provided.draggableProps,
                      draggableButtonProps: provided.dragHandleProps,
                    }}
                  />
                )}
              </Draggable>
            ) : (
              <RequestsButton key={nestedRequest.name} request={nestedRequest} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export { RequestsButton };
