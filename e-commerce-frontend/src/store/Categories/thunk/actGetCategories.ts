import { TCategory } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utilities/axiosError";
import axios from "axios";

// Action
type TResponse = TCategory[]
const getCategories = createAsyncThunk("Categories",
    async (_, thunkAPI) => {
        const { rejectWithValue ,signal } = thunkAPI
        try {
            const response = await axios.get<TResponse>("/category",{signal})
            const data = response.data
            return data
        } catch (error) {
            rejectWithValue(AxiosErrorHandler(error))
        }
    }
) 

export default getCategories;