import { ApiCostume } from "@/interfaces/costume";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface ICart {
  items: CartCostume[];
  total: number;
}

const initialState: ICart = {
  items: [],
  total: 0,
};

export interface CartCostume extends ApiCostume {
  quantity: number
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state: Draft<typeof initialState>,
      action: PayloadAction<CartCostume>
    ) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.idModel === newItem.idModel);
    
      if (existingItem) {
        (existingItem as CartCostume).quantity += 1;
      } else {
        newItem.quantity = 1;
        state.items.push(newItem);
      }
    
      state.total += newItem.price;
    },
    
    
    removeItem: (
      state: Draft<typeof initialState>,
      action: PayloadAction<number>
    ) => {
      const indexToRemove = state.items.findIndex(
        (item) => item.idModel === action.payload
      );
      if (indexToRemove !== -1) {
        const removedItem = state.items.splice(indexToRemove, 1)[0];
        state.total -= removedItem.price;
      }
    },
  },
});

// A small helper for `useSelector` function.
export const getCartState = (state: { cart: ICart }) => state.cart;

// Exports all actions
export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
