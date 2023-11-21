import { CartCostume, FetchResult } from "@/interfaces/costume";
import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface ICart {
  items: CartCostume[];
  total?: number;
  shipping?: number;
  error?: string;
}

const initialState: ICart = {
  items: [],
};

type ValidatedCart = FetchResult & {
  total: number;
  shippingCost: number;
  errorMessage: string | null;
};

const DUMMY_USER = 3;

export const validateCart = createAsyncThunk<
  ValidatedCart,
  { catalog: number; quantitySold: number }[]
>("cart/validateCart", async (items) => {
  try {
    const body = {
      user: DUMMY_USER,
      city: 1,
      itemSoldList: items,
    };

    const response = await fetch(`/api/validateCart/`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("ERROR");
    console.error(error);
    throw error;
  }
});

export const submitCart = createAsyncThunk<
  FetchResult,
  { catalog: number; quantitySold: number }[]
>("cart/submitCart", async (items) => {
  try {
    const body = {
      user: DUMMY_USER,
      city: 1,
      itemSoldList: items,
      address: "dummy address"
    };

    const response = await fetch(`/api/purchase/`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log(data)

    return data;
  } catch (error) {
    console.log("ERROR");
    console.error(error);
    throw error;
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state: Draft<typeof initialState>,
      action: PayloadAction<CartCostume>
    ) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.idCatalog === newItem.idCatalog
      );

      if (existingItem) {
        (existingItem as CartCostume).quantity = newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },

    removeItem: (
      state: Draft<typeof initialState>,
      action: PayloadAction<number>
    ) => {
      const indexToRemove = state.items.findIndex(
        (item) => item.idCatalog === action.payload
      );
      if (indexToRemove !== -1) {
        const removedItem = state.items.splice(indexToRemove, 1)[0];
      }
    },
  },
  extraReducers(builder) {
    builder
    .addCase(validateCart.fulfilled, (state, action) => {
      state.shipping = action.payload.shippingCost;
      state.total = action.payload.total;
    })
    .addCase(submitCart.fulfilled, (state, action) => {
      console.log("DONE")
      console.log(action)
    })
  },
});

// A small helper for `useSelector` function.
export const getCartState = (state: { cart: ICart }) => state.cart;

// Exports all actions
export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
