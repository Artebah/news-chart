import { IFilterRequest } from "../types/IFilterRequest";

export function getChangedRequestsFilter(
  requestsFilter: IFilterRequest[],
  requestName: string,
  newProps: object
) {
  const newRequests = requestsFilter.map((filter, i) => {
    if (filter.name === requestName) {
      return {
        ...filter,
        ...newProps,
      };
    }

    //  if (filter.list) {
    //    const newSubRequests = filter.list.map((subFilter) => {
    //      if (subFilter.name === requestName) {
    //        return {
    //          ...subFilter,
    //          ...newProps,
    //        };
    //      }
    //      return subFilter;
    //    });

    //    const areAllSubFiltersInactive = newSubRequests.every(
    //      (subFilter) => subFilter.active === false
    //    );

    //    if (areAllSubFiltersInactive) {
    //      return {
    //        ...filter,
    //        active: false,
    //        list: newSubRequests,
    //      };
    //    } else {
    //      return {
    //        ...filter,
    //        active: true,
    //        list: newSubRequests,
    //      };
    //    }
    //  }

    return filter;
  });

  return newRequests;
}

/* 

    const newSubFilters = filter.list?.map((subFilter) => {
      if (subFilter.name === requestName) {
        return {
          ...subFilter,
          ...newProps,
        };
      }

      return subFilter;
    });

    console.log(newSubFilters);

*/
