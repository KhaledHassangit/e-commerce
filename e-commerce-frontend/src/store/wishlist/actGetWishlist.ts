import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProducts } from "@customTypes/products";


type TResponse = TProducts[]


const actGetWishlist = createAsyncThunk(
    "wishtlist/actGetWishlist",
    async (_, thunkAPI) => {
        const { rejectWithValue , fulfillWithValue} = thunkAPI
        try {

            const userWishlist = await axios.get<{productId:number}[]>("/wishlist?userId=1")
            if(!userWishlist.data.length){
                return fulfillWithValue([])
            }
            const concatenateditemsIds = userWishlist.data.map((item) => `id=${item.productId}`).join("&")
            const response = await axios.get<TResponse>(`/products?${concatenateditemsIds}`)
            return response.data

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message)
            } else {
                return rejectWithValue("An unexpected error!")
            }
        }
    }
)

export default actGetWishlist