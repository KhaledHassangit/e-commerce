import { TProducts } from "@customTypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";


type TResponse = TProducts[]
const  actGetProductsCartItems = createAsyncThunk("cart/actGetProductsCartItems",
    async (_,thunkAPI) => {
        const {rejectWithValue ,fulfillWithValue, getState} = thunkAPI
        const { cart } = getState() as RootState
        const itemsIds = Object.keys(cart.items)
        if(!itemsIds.length){
            return fulfillWithValue([]) 
        }
        try {
            const concatenateditemsIds = itemsIds.map((item) => `id=${item}`).join("&")
            const response = await axios.get<TResponse>(`/products?${concatenateditemsIds}`)
            return response.data
        } 
        catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message)
            } else {
                return rejectWithValue("unexpected error!")
            }
        }
    }
)


export default actGetProductsCartItems