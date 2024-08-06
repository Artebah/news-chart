export interface IFilterRequestMain {
  name: string;
  active: boolean;
  deleted: boolean;
  disabled?: boolean;
}

export interface IFilterRequest extends IFilterRequestMain {
  list?: IFilterRequestMain[];
}
