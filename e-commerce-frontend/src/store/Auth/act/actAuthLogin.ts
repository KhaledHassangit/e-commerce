import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosErrorHandler from "@utilities/axiosError";

type TLogin = {
    email:string;
    password:string
}

type TResponse = {
    accessToken:string;
    user:{
        id:number;
        firstName:string;
        lastName:string;
        email:string;
    }
}

const actAuthLogin = createAsyncThunk("act/actAuthLogin",async (formData:TLogin,thunkApi)=>{
    const {rejectWithValue} = thunkApi
    try{
        const response = await axios.post<TResponse>("/login",formData)
        return response.data
    }
    catch(e){
        return rejectWithValue(AxiosErrorHandler(e))
    }
})


export default actAuthLogin