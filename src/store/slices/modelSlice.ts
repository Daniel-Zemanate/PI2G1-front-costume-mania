import { TableCategory } from "@/interfaces/category";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IModels {
  categories: any[];
}

const initialState: IModels = {
  categories: [],
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    saveCategories: (
      state: Draft<typeof initialState>,
      action: PayloadAction<TableCategory[]>
    ) => {
      const mappedCategories = action.payload.map((e) => ({
        key: e.idCategory,
        value: e.name,
      }));
      state.categories = mappedCategories;
    },
  },
});

// A small helper for `useSelector` function.
export const getModelState = (state: { model: IModels }) => state.model;

// Exports all actions
export const { saveCategories } = modelSlice.actions;

export default modelSlice.reducer;
