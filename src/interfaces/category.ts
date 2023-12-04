export interface AdminCategory {
  idCategory: number;
  name: string;
  statusCategory: StatusCategory;
}

export interface StatusCategory {
  id: number;
  description: string;
}

export type TableCategory = AdminCategory & {
  id: string;
  status: string;
  idStatus: string;
};
