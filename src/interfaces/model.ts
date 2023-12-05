export interface Model {
  idModel: number;
  nameModel: string;
  category: Category;
  urlImage: string;
  statusModel: statusModel;
}

export type TableModel = Model & { id: string };

export interface statusModel {
  id: number;
  description: string;
}

export interface Category {
  idCategory: number;
  name: string;
  statusCategory: Status;
}

export interface Status {
  id: number;
  description: string;
}

export interface ModelDataTable {
  id: number;
  model: string;
  category: string;
}
