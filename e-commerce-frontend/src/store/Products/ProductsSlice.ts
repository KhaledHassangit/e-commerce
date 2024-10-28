import { TLoading } from './../../types/shared';
import { TProducts } from './../../types/products';
import { createSlice } from "@reduxjs/toolkit"
import getProductsByCat from "./thunk/actGetProductsByCat"




interface IProductsSlice {
    records: TProducts[];
    loading: TLoading
    error: string | null
}
const initialState: IProductsSlice = {
    records: [],
    loading: "idle",
    error: null,
}


const products = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsCleanUp : (state) =>{
            state.records = []
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsByCat.pending, (state) => {
            state.loading = "pending"
            state.error = null
        });
        builder.addCase(getProductsByCat.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.records = action.payload
        });
        builder.addCase(getProductsByCat.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.payload as string
        });
    }

})
export const { productsCleanUp  } = products.actions
export { getProductsByCat };
export default products.reducer;