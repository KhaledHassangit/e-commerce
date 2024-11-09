import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import categories from "./Categories/CategoriesSlice"
import products from "./Products/ProductsSlice"
import cart from './cart/cartSlice'
import wishlist from "./wishlist/wishlistSlice"
import auth from './Auth/authslice'
import orders from "./orders/ordersSlice"


const RootPersistConfig = {
    key: "root",
    storage,
    whitelist: ["auth","cart"]

}
const authPresistConfig = {
    key: "auth",
    storage,
    whitelist: ["user","accessToken"]
}
// Saving Cart Items 
const cartPersistConfig = {
    key: "cart",
    storage,
    whitelist: ["items"]

}


const RootReducer = combineReducers(
    {
        categories,
        products,
        cart: persistReducer(cartPersistConfig, cart),
        wishlist,
        auth:persistReducer(authPresistConfig, auth),
        orders
    }
)
const persistedReducer = persistReducer(RootPersistConfig,RootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare({
            serializableCheck:{
                ignoredActions :[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export { store, persistor };