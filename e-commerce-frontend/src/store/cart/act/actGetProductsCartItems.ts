import { TProducts } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import AxiosErrorHandler from "@utilities/axiosError";
import axios from "axios";


type TResponse = TProducts[]
const  actGetProductsCartItems = createAsyncThunk("cart/actGetProductsCartItems",
    async (_,thunkAPI) => {
        const {rejectWithValue ,fulfillWithValue, getState ,signal} = thunkAPI
        const { cart } = getState() as RootState
        const itemsIds = Object.keys(cart.items)
        if(!itemsIds.length){
            return fulfillWithValue([]) 
        }
        try {
            const concatenateditemsIds = itemsIds.map((item) => `id=${item}`).join("&")
            const response = await axios.get<TResponse>(`/products?${concatenateditemsIds}`,{signal})
            return response.data
        } 
        catch (error) {
            return rejectWithValue(AxiosErrorHandler(error))
        }
    }
)


export default actGetProductsCartItems