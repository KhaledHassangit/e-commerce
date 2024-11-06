import { useAppDispatch, useAppSelector } from "@store/hooks"
import { getProductsByCat, productsCleanUp } from "@store/Products/ProductsSlice"
import {useEffect } from "react"
import { useParams } from "react-router"

const UseProducts = () => {
    const params = useParams()
    const productPrefix = params.prefix
    const dispatch = useAppDispatch()
    const { loading, error, records } = useAppSelector((state) => state.products)
    const WishListItemsId = useAppSelector((state) => state.wishlist.wishlistIds)
    const cartItems = useAppSelector((state) => state.cart.items)
    const accessToken = useAppSelector((state) => state.auth.accessToken)
    
    const ProductInfo = records.map((prod) => ({
        ...prod,
        quantity: cartItems[prod.id],
        isLiked:WishListItemsId.includes(prod.id),
        isAuthenticated:!!accessToken
    }))
    useEffect(() => {
        const promise = dispatch(getProductsByCat(params.prefix as string))
        
        return () => {
            promise.abort()
            dispatch(productsCleanUp())
        }
    }, [dispatch, params])


    return [loading,error,ProductInfo,productPrefix]
}

export default UseProducts
