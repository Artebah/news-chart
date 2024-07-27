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

  const onDelete = () => {
    const newRequestsFilter = getChangedRequestsFilter(requestsFilter, request.name, {
      deleted: true,
    });

    requestsFilter.setFilter(newRequestsFilter);
  };

  React.useEffect(() => {
    if (editedName !== "") {
      const newRequestsFilter = getChangedRequestsFilter(requestsFilter, request.name, {
        name: editedName,
      });

      requestsFilter.setFilter(newRequestsFilter);
    }
  }, [editedName, request.name, requestsFilter]);

  const onEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="item-requests-filter">
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
