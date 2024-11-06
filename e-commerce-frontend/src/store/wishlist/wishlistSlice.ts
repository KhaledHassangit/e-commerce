import { createSlice } from '@reduxjs/toolkit';
import { LikeActionToggle } from './LikeAction';
import actGetWishlist from './actGetWishlist';
import { TLoading, TProducts } from '@customTypes/index';
import { authLogout } from '@store/Auth/authslice';

interface IWishlistState {
    wishlistIds: number[];
    error: null | string
    loading: TLoading
    productsInfo: TProducts[];
}

const initialState: IWishlistState = {
    wishlistIds: [],
    error: null,
    loading: "idle",
    productsInfo: []
}

const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        CleanWishlistProducts: (state) => {
            state.productsInfo = []
        },

    },
    extraReducers: (builder) => {
        // get wishlist ids
        builder.addCase(LikeActionToggle.pending, (state) => {
            state.error = null
        });
        builder.addCase(LikeActionToggle.fulfilled, (state, action) => {
            if (action.payload.type === "add") {
                state.wishlistIds.push(action.payload.id)
            } else {
                state.wishlistIds = state.wishlistIds.filter((id) => id !== action.payload.id)
                state.productsInfo = state.productsInfo.filter((prod) => prod.id !== action.payload.id)
            }
        });
        builder.addCase(LikeActionToggle.rejected, (state, action) => {
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload
            }
        })

        // get wishlist items
        builder.addCase(actGetWishlist.pending, (state) => {
            state.error = null
            state.loading = "pending"
        });
        builder.addCase(actGetWishlist.fulfilled, (state, action) => {
            state.loading = "succeeded"
            if (action.payload.dataType === "productsFullInfo") {
                state.productsInfo = action.payload.data as TProducts[]
            } else if
                    (action.payload.dataType === "ProductsIds") {
                        state.wishlistIds = action.payload.data as number[]
                }
            else{
                state.productsInfo = []
                state.wishlistIds = []
            }   
            
        })
        builder.addCase(actGetWishlist.rejected, (state, action) => {
            state.loading = "failed"
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload
            }
        })
        // when logout reset
        builder.addCase(authLogout, (state) => {
            state.wishlistIds = [];
            state.productsInfo = [];
        });

    }

})

export { WishlistSlice, actGetWishlist }
export const { CleanWishlistProducts } = WishlistSlice.actions
export default WishlistSlice.reducer