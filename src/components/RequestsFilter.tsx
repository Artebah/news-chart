import React from "react";
import { CreateRequestItem } from "./CreateRequestItem";
import { RequestsButton } from "./RequestsButton";
import { RequestsButtonsGroup } from "./RequestsButtonsGroup";
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

  //const onClick = (name: string, isActive: boolean) => {
  //  const updatedFilters = requestsFilter.value.map((filter) =>
  //    filter.name === name ? { ...filter, isActive: !isActive } : filter
  //  );

  //  requestsFilter.setFilter(updatedFilters);
  //};

  const defaultLayout = (
    <>
      <div className="requests-filter-buttons ">
        {requestsFilter.value.map((request) =>
          request.list ? (
            <RequestsButtonsGroup key={request.name} request={request} />
          ) : (
            <RequestsButton key={request.name} request={request} />
          )
        )}
      </div>
      <button onClick={openEditMenuHandle} className="requests-filter-edit">
        <EditIcon />
      </button>
    </>
  );

  const editLayout = (
    <>
      <div className="requests-filter-buttons ">
        <button className="requests-filter-edit-button btn">Створити новий запит</button>
        <button className="requests-filter-edit-button btn">Створити нову групу</button>
      </div>
      <button onClick={closeEditMenuHandle} className="requests-filter-edit">
        <CloseIcon />
      </button>
      <div className="requests-filter-list-block panel">
        {requestsFilter.value.map((request) => (
          <CreateRequestItem key={request.name} request={request} />
        ))}
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
