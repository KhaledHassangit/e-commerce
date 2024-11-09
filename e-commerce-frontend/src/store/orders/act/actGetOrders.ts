import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@store/index";
import { TorderItem } from "@customTypes/orders";
import AxiosErrorHandler from "@utilities/axiosError";

type TResponse = TorderItem[];

const actGetOrders = createAsyncThunk(
    "orders/actGetOrders",
    async (_, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        const { auth } = getState() as RootState;

        try {
            const res = await axios.get<TResponse>(
                `/orders?userId=${auth.user?.id}`,
                { signal }
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error));
        }
    }
);

export default actGetOrders;