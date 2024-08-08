import React from "react";
import { DndRequests } from "./DndRequests";
import { RequestsButton } from "./RequestsButton";
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { useFilterContext } from "../hooks/useFilterContext";

interface RequestsFilterProps {
  openEditRequestsMenu: boolean;
  setOpenEditRequestsMenu: any;
}

const RequestsFilter: React.FC<RequestsFilterProps> = ({
  setOpenEditRequestsMenu,
  openEditRequestsMenu,
}) => {
  const { requestsFilter } = useFilterContext();

  const openEditMenuHandle = () => {
    setOpenEditRequestsMenu(true);
  };
  const closeEditMenuHandle = () => {
    setOpenEditRequestsMenu(false);
  };

  const defaultLayout = (
    <>
      <div className="requests-filter-buttons ">
        {requestsFilter.value.length ? (
          requestsFilter.value
            .slice(0, 8)
            .map((request) => (
              <RequestsButton
                request={request}
                isGroup={!!request.list?.length}
                key={request.name}
              />
            ))
        ) : (
          <p>Немає фільтрів запитів :(</p>
        )}
      </div>
      <button onClick={openEditMenuHandle} className="requests-filter-edit">
        <EditIcon />
      </button>
    </>
  );

  const editLayout = (
    <>
      <div className="requests-filter-buttons">
        <button className="requests-filter-edit-button btn">Створити новий запит</button>
        <button className="requests-filter-edit-button btn">Створити нову групу</button>
      </div>
      <button onClick={closeEditMenuHandle} className="requests-filter-edit">
        <CloseIcon />
      </button>
      <div className="requests-filter-list-block panel">
        <DndRequests initialData={requestsFilter.value} />
      </div>
    </>
  );

  return (
    <div className="requests-filter panel">
      {openEditRequestsMenu ? editLayout : defaultLayout}
    </div>
  );
};

export { RequestsFilter };
