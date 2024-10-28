import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProducts } from "@customTypes/index";
import AxiosErrorHandler from "@utilities/axiosError";
type TResponse = TProducts[]


const actGetWishlist = createAsyncThunk(
    "wishtlist/actGetWishlist",
    async (_, thunkAPI) => {
        const { rejectWithValue , fulfillWithValue ,signal} = thunkAPI
        try {

            const userWishlist = await axios.get<{productId:number}[]>("/wishlist?userId=1",{signal})
            if(!userWishlist.data.length){
                return fulfillWithValue([])
            }
            const concatenateditemsIds = userWishlist.data.map((item) => `id=${item.productId}`).join("&")
            const response = await axios.get<TResponse>(`/products?${concatenateditemsIds}`)
            return response.data

        } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error))

        }
    }
)

export default actGetWishlist