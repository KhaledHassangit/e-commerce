import { createSlice } from "@reduxjs/toolkit";
import getCategories from "./thunk/actGetCategories";
import { TLoading } from "@customTypes/shared";
import { TCategory } from "@customTypes/category";

interface ICategoriesState {
    records: TCategory[]
    loading:TLoading
    error : string | null
}

const initialState:ICategoriesState = {
    records:[],
    loading:"idle",
    error:null,
}

const categories = createSlice({
    name:"categories",
    initialState,
    reducers:{
        cleanUpCategories: (state) => {
            state.records = []
        },
    },
    extraReducers:(builder) => {
        builder.addCase(getCategories.pending,(state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(getCategories.fulfilled,(state,action) => {
            state.loading = "succeeded"
            state.records = action.payload
        })
        builder.addCase(getCategories.rejected,(state,action) => {
            state.loading = "failed"
            state.error = action.payload as string;  
        })
    }
})

export {getCategories }
export const  {cleanUpCategories} = categories.actions
export default categories.reducer