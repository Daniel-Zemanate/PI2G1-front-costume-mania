import { KeyValue } from "@/interfaces/costume";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IInvoiceStatus {
  invoiceStatus: KeyValue[];
}

const initialState: IInvoiceStatus = {
  invoiceStatus: [],
};

export const invoiceSlice = createSlice({
  name: "invoiceStatus",
  initialState,
  reducers: {
    saveInvoiceStatus: (
      state: Draft<typeof initialState>,
      action: PayloadAction<KeyValue[]>
    ) => {
      state.invoiceStatus = action.payload;
    },
  },
});

// A small helper for `useSelector` function.
export const getInvoiceStatusState = (state: { invoiceStatus: IInvoiceStatus }) =>
  state.invoiceStatus;

// Exports all actions
export const { saveInvoiceStatus } = invoiceSlice.actions;

export default invoiceSlice.reducer;
