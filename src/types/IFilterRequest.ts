export interface IFilterRequest {
  name: string;
  active: boolean;
  deleted: boolean;
  disabled?: boolean;
  list?: Omit<IFilterRequest, "list">[];
}
