import React from "react";
import { RequestsButton } from "./RequestsButton";
import { RequestsButtonsGroup } from "./RequestsButtonsGroup";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { getChangedRequestsFilter } from "../helpers/getChangedRequestsFilter";
import { useFilterContext } from "../hooks/useFilterContext";
import { IFilterRequest } from "../types/IFilterRequest";

interface CreateRequestItemProps {
  request: IFilterRequest;
}

const CreateRequestItem: React.FC<CreateRequestItemProps> = ({ request }) => {
  const { requestsFilter } = useFilterContext();
  const [isEditable, setIsEditable] = React.useState(false);
  const [editedName, setEditedName] = React.useState("");
  const [isActive, IsActive] = React.useState(true);

  React.useEffect(() => {
    if (editedName !== "") {
      const newRequestsFilter = getChangedRequestsFilter(requestsFilter, request.name, {
        name: editedName,
      });

      requestsFilter.setFilter(newRequestsFilter);
    }
  }, [editedName, request.name, requestsFilter]);

  const onDelete = () => {
    const newRequestsFilter = getChangedRequestsFilter(requestsFilter, request.name, {
      deleted: true,
    });

    requestsFilter.setFilter(newRequestsFilter);
  };

  const onEdit = () => {
    setIsEditable(!isEditable);
  };
  const onToggleActive = () => {
    IsActive(isActive);
  };

  return (
    <div className="item-requests-filter">
      <input
        onChange={onToggleActive}
        type="checkbox"
        name="item-requests-filter-checkbox"
      />
      <button onClick={onDelete} className="item-requests-filter-button btn">
        <DeleteIcon />
      </button>
      <button onClick={onEdit} className="item-requests-filter-button btn">
        <EditIcon />
      </button>
      {request.list ? (
        <RequestsButtonsGroup
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          setEditedName={setEditedName}
          request={request}
          isEdit
        />
      ) : (
        <RequestsButton
          setEditedName={setEditedName}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          request={request}
          isEdit
        />
      )}
    </div>
  );
};

export { CreateRequestItem };
