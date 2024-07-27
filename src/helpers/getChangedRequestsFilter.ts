export function getChangedRequestsFilter(
  requestsFilter: any,
  requestName: string,
  newProps: object
) {
  return requestsFilter.value.map((filter: any) => {
    if (filter.name === requestName) {
      return {
        ...filter,
        ...newProps,
      };
    } else {
      return filter;
    }
  });
}
