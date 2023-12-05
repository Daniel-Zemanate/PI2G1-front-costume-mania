import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICatalog {
  sizes: any[];
  models: any[];
}

const initialState: ICatalog = {
  sizes: [],
  models: []
};

export const catalogSlice = createSlice({
  name: "catalogCategories",
  initialState,
  reducers: {
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
export const { saveSizes, saveModels } = catalogSlice.actions;

export default catalogSlice.reducer;
