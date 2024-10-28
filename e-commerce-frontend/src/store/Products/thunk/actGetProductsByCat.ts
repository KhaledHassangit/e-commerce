import { TProducts } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utilities/axiosError";
import axios from "axios";

// Action
type TResposnse = TProducts[]

const getProductsByCat = createAsyncThunk("Products",
    async (prefix:string, thunkAPI) => {
        const { rejectWithValue ,signal} = thunkAPI;
        try {
            const response = await axios.get<TResposnse>(`/products?cat_prefix=${prefix}`
                ,{
                    signal
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error))

        }
    })

export default getProductsByCat;