import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosErrorHandler from "@utilities/axiosError";
import { RootState } from "@store/index";

const actPlaceOrder = createAsyncThunk("orders/actPlaceOrder",
    async(subtotal:number,thunkAPI)=>{
        const {rejectWithValue ,getState} = thunkAPI
        const {cart,auth} = getState() as RootState

        const orderItems = cart.productsInfo.map((el)=>({
            id:el.id,
            title:el.title,
            price:el.price,
            quantity:cart.items[el.id],
            img:el.img,
        }))
        try {   
                const response = await axios.post(`/orders`,{
                    userId:auth.user?.id,
                    items:orderItems,
                    subtotal,
                })
                return response.data
        } catch (error) {
                return rejectWithValue(AxiosErrorHandler(error))
        }

})


export default actPlaceOrder