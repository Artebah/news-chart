import React from "react";
import { RequestsButton } from "./RequestsButton";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { ReactComponent as DraggableIcon } from "../assets/icons/draggable.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { getChangedRequestsFilter } from "../helpers/getChangedRequestsFilter";
import { useFilterContext } from "../hooks/useFilterContext";
import { IFilterRequest } from "../types/IFilterRequest";

interface CreateRequestItemProps {
  isNewRequest?: boolean;
  setIsNewRequest?: any;
  request: IFilterRequest;
  dndProps: {
    ref: any;
    draggableProps: any;
    draggableButtonProps: any;
  };
}

const CreateRequestItem: React.FC<CreateRequestItemProps> = ({
  request,
  dndProps,
  isNewRequest,
  setIsNewRequest,
}) => {
  const { requestsFilter } = useFilterContext();
  const [isEditable, setIsEditable] = React.useState(false);

  React.useEffect(() => {
    const lastFilterInList = requestsFilter.value[requestsFilter.value.length - 1];

    if (isNewRequest && request.name === lastFilterInList.name) {
      setIsEditable(true);
      setIsNewRequest(false);
    }
  }, [isNewRequest, requestsFilter.value, request, setIsNewRequest]);

  const onDelete = () => {
    const newRequestsFilter = getChangedRequestsFilter(
      requestsFilter.value,
      request.name,
      {
        deleted: true,
      }
    );

    requestsFilter.setFilter(newRequestsFilter);
  };

  const onEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="item-requests-filter" ref={dndProps.ref} {...dndProps.draggableProps}>
      <div {...dndProps.draggableButtonProps} className="item-requests-filter-drag-icon">
        <DraggableIcon />
      </div>
      <button onClick={onDelete} className="item-requests-filter-button btn">
        <DeleteIcon />
      </button>
      <button onClick={onEdit} className="item-requests-filter-button btn">
        <EditIcon />
      </button>

      <RequestsButton
        request={request}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        isGroup={!!request.list}
        isEdit
      />
    </div>
  );
};

export { CreateRequestItem };
