import { TCategory } from "@customTypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action
type TResponse = TCategory[]
const getCategories = createAsyncThunk("Categories",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const response = await axios.get<TResponse>("/category")
            const data = response.data
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message)
            } else {
                return rejectWithValue("unexpected error!")
            }
        }
    }
) 

export default getCategories;