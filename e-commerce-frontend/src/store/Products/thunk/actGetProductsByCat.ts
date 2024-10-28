import { TProducts } from "@customTypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action
type TResposnse = TProducts[]

const getProductsByCat = createAsyncThunk("Products",
    async (prefix:string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get<TResposnse>(`/products?cat_prefix=${prefix}`)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message)
            } else {
                return rejectWithValue("An unexpected error!")
            }

        }
    })

export default getProductsByCat;