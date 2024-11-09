import { TProducts ,TLoading } from '@customTypes/index';
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsCartItems from './act/actGetProductsCartItems';


interface ICartState  {
    items:{[key:string]:number};
    productsInfo : TProducts [];
    loading:TLoading;
    error:null | string
}

const initialState:ICartState = {
    items : {} ,
    productsInfo : [],
    loading :"idle",
    error:null
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state,action) => { 
            const id = action.payload
            if(state.items[id]) {
                state.items[id]++
            } else{
                state.items[id] = 1
            }
        }, 

        cartItemsChangeQuantity :(state,action) =>{
            state.items[action.payload.id] = action.payload.quantity
        },
        cartItemsRemove :(state,action) =>{
            delete state.items[action.payload]
            state.productsInfo = state.productsInfo.filter(
                item => item.id !== action.payload
            );
        },
        cleanCartproductsInfo:(state) => {
            state.productsInfo = []
        },
        clearCartAfterPlaceOrder:(state)=>{
            state.items={}
            state.productsInfo = []
        }

    },
    extraReducers: (builder) => {
        builder.addCase(actGetProductsCartItems.pending,(state)=>{
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(actGetProductsCartItems.fulfilled,(state,action)=>{
            state.loading = "succeeded"
            state.productsInfo = action.payload
        })
        builder.addCase(actGetProductsCartItems.rejected,(state,action)=>{
            state.loading = "failed"
            state.error = action.payload as string;  

        })

    }

})

export const { addToCart,cartItemsChangeQuantity ,cartItemsRemove,cleanCartproductsInfo ,clearCartAfterPlaceOrder } = cartSlice.actions;

export default cartSlice.reducer