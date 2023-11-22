import { FavoriteCostume, FetchResult } from "@/interfaces/costume";
import {
  createSlice,
  Draft,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export interface IFavorites {
  favorites: FavoriteCostume[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: IFavorites = {
  favorites: [],
  status: "idle",
};

export const fetchFavs = createAsyncThunk(
  "favorites/fetchFavorites",
  async (idUser: number): Promise<FavoriteCostume[]> => {
    try {
      const res = await fetch(`/api/favorites/user/${idUser}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const removeFav = createAsyncThunk<FetchResult, number>(
  "favorites/removeFavorite",
  async (idFav) => {
    try {
      const { status, statusText } = await fetch(`/api/favorites/`, {
        method: "DELETE",
        body: JSON.stringify({ idFav }),
      });
      return { status, statusText };
    } catch (error) {
      console.log("ERROR");
      console.error(error);
      throw error;
    }
  }
);

export const addFav = createAsyncThunk<FetchResult, {idModel: number, idUser: string}>(
  "favorites/addFavorite",
  async ({idModel, idUser}) => {
    console.log(idUser)
    try {
      const { status, statusText } = await fetch(`/api/favorites/`, {
        method: "POST",
        body: JSON.stringify({
          users: idUser,
          model: idModel,
        }),
      });
      console.log(status, statusText)
      return { status, statusText };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (
      state: Draft<typeof initialState>,
      action: PayloadAction<FavoriteCostume>
    ) => {
      const newItem = action.payload;
      state.favorites.push(newItem);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFavs.fulfilled, (state, action) => {
        const favorites = action.payload;
        state.status = "succeeded";
        state.favorites = favorites;
      })
      .addCase(removeFav.fulfilled, (state, action) => {
        console.log(action);
        state.status = "idle";
      })
      .addCase(removeFav.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(addFav.fulfilled, (state, action) => {
        console.log(action);
        state.status = "idle";
      });
  },
});

// A small helper for `useSelector` function.
export const getFavoritesState = (state: { favorites: IFavorites }) =>
  state.favorites;

// Exports all actions
// export const {  } = favoritesSlice.actions;

export default favoritesSlice.reducer;
