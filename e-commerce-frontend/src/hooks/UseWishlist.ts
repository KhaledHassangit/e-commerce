import { useAppDispatch ,useAppSelector } from "@store/hooks"
import {actGetWishlist  ,CleanWishlistProducts} from "@store/wishlist/wishlistSlice"
import { useEffect } from "react"

const UseWishlist = () => {
    const dispatch = useAppDispatch()
    const {loading , error,productsInfo} = useAppSelector((state)=> state.wishlist)
    const cartItems = useAppSelector((state) => state.cart.items)

    useEffect(() => {
        const promise = dispatch(actGetWishlist("productsFullInfo"))
        return ()=>{
            promise.abort()
            dispatch(CleanWishlistProducts())
        }
    }, [dispatch])
    const records = productsInfo.map((prod) => ({
        ...prod,
        quantity: cartItems[prod.id],
        isLiked:true,
        isAuthenticated:true

    }))

    return [loading,error,records]
}

export default UseWishlist