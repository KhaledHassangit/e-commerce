import { RootState } from "@store/index"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProducts } from "@customTypes/index";
import AxiosErrorHandler from "@utilities/axiosError";

type TResponse = TProducts[]
type TDataType = "productsFullInfo" | "ProductsIds"

const actGetWishlist = createAsyncThunk(
    "wishtlist/actGetWishlist",
    async (dataType:TDataType, thunkAPI) => {
        const { rejectWithValue  ,signal,getState} = thunkAPI
        const {auth} = getState() as RootState
        try {
            const userWishlist = await axios.get<{productId:number}[]>(`/wishlist?userId=${auth.user?.id}`,{signal})
            if(!userWishlist.data.length){
                return {
                    data :[],
                    dataType:"empty"
                }
            }
            if(dataType === "ProductsIds"){
                const concatenateditemsIds = userWishlist.data.map((item) => item.productId)
                return {
                    data :concatenateditemsIds,
                    dataType:"ProductsIds"
                }
            }else{
                const concatenateditemsIds = userWishlist.data.map((item) => `id=${item.productId}`).join("&")
                const response = await axios.get<TResponse>(`/products?${concatenateditemsIds}`)
                return {
                    data :response.data,
                    dataType:"productsFullInfo"
                }
            }
        } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error))

        }
    }
)

export default actGetWishlist