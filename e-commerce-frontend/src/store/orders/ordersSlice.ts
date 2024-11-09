import { isString, TLoading, TorderItem } from '@customTypes/index';
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from './act/actPlaceOrder';
import actGetOrders from './act/actGetOrders';


interface TOrders {
    loading: TLoading;
    error: null | string;
    orderList: TorderItem[];
}
const initialState: TOrders = {
    loading: "idle",
    error: null,
    orderList: [],
}
const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        resetOrderStatus: (state) => {
            state.loading = "idle"
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actPlaceOrder.pending, (state) => {
            state.loading = "pending"
            state.error = null
        });
        builder.addCase(actPlaceOrder.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.error = null
            state.orderList = action.payload
        });
        builder.addCase(actPlaceOrder.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload
            }
        });
        // get orders
        builder.addCase(actGetOrders.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetOrders.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.orderList = action.payload;
        });
        builder.addCase(actGetOrders.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


    }
})

export { actPlaceOrder, actGetOrders }
export const { resetOrderStatus } = ordersSlice.actions
export default ordersSlice.reducer