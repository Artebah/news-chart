import { IFilterRequest } from "../types/IFilterRequest";

export function getChangedRequestsFilter(
  requestsFilter: IFilterRequest[],
  requestName: string,
  newProps: object
) {
  return requestsFilter.map((filter, i) => {
    if (filter.name === requestName) {
      const newFilter = {
        ...filter,
        ...newProps,
      };

      newFilter.list = newFilter.list?.map((subFilter) => ({
        ...subFilter,
        active: newFilter.active,
      }));

      return newFilter;
    }

    if (filter.list) {
      const newSubRequests = filter.list.map((subFilter) => {
        if (subFilter.name === requestName) {
          return {
            ...subFilter,
            ...newProps,
          };
        }

        return subFilter;
      });

      const areAllSubFiltersInactive = newSubRequests.every(
        (subFilter) => subFilter.active === false
      );

      return {
        ...filter,
        active: areAllSubFiltersInactive ? false : true,
        list: newSubRequests,
      };
    }
    return filter;
  });
}
