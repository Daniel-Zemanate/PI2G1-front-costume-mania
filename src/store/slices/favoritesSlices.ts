import { ApiCostume } from "@/interfaces/costume";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface IFavorites {
  favorites: ApiCostume[];
}

const initialState: IFavorites = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (
      state: Draft<typeof initialState>,
      action: PayloadAction<ApiCostume>
    ) => {
      const newItem = action.payload;
      state.favorites.push(newItem);
    },

    removeFavorite: (
      state: Draft<typeof initialState>,
      action: PayloadAction<number>
    ) => {
      const idToRemove = action.payload;
      const indexToRemove = state.favorites.findIndex(
        (favorite) => favorite.idModel === idToRemove
      );

      if (indexToRemove !== -1) {
        state.favorites.splice(indexToRemove, 1);
      }
    },
  },
});

// A small helper for `useSelector` function.
export const getFavoritesState = (state: { favorites: IFavorites }) =>
  state.favorites;

// Exports all actions
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
