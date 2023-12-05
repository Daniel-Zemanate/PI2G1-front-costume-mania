import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICatalog {
  categories: any[];
  sizes: any[];
  models: any[];
}

const initialState: ICatalog = {
  categories: [],
  sizes: [],
  models: []
};

export const catalogSlice = createSlice({
  name: "catalogCategories",
  initialState,
  reducers: {
    saveCategories: (
      state: Draft<typeof initialState>,
      action: PayloadAction<any[]>
    ) => {
      state.categories = action.payload;
    },

    saveSizes: (
      state: Draft<typeof initialState>,
      action: PayloadAction<any[]>
    ) => {
      state.sizes = action.payload;
    },

    saveModels: (
      state: Draft<typeof initialState>,
      action: PayloadAction<any[]>
    ) => {
      state.models = action.payload;
    },
  },
});

// A small helper for `useSelector` function.
export const getCatalogState = (state: { catalog: ICatalog }) =>
  state.catalog;

// Exports all actions
export const { saveCategories, saveSizes, saveModels } = catalogSlice.actions;

export default catalogSlice.reducer;
