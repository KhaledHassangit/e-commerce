import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import actGetProductsCartItems from "@store/cart/act/actGetProductsCartItems"
import { cartItemsChangeQuantity, cartItemsRemove, cleanCartproductsInfo } from "@store/cart/cartSlice"
import { resetOrderStatus } from "@store/orders/ordersSlice"

const UseCart = () => {

    const dispatch = useAppDispatch()
    const { items, productsInfo, loading, error } = useAppSelector((state) => state.cart)
    const userAccessToken = useAppSelector(state => state.auth.accessToken)
    const placeOrderStatus = useAppSelector(state => state.orders.loading)
    
    useEffect(() => {
        const promise = dispatch(actGetProductsCartItems())
        return() => {
            promise.abort(  )
            dispatch(cleanCartproductsInfo())
            dispatch(resetOrderStatus())
        }
    }, [dispatch])

    const products = productsInfo.map((prod) => ({
        ...prod,
        quanitiy: items[prod.id]
    }))

    const changeQuanitiyHandler = useCallback((id: number, quantity: number) => {
        dispatch(cartItemsChangeQuantity({ id, quantity }))
    }, [dispatch])

    const removeItemHandler = useCallback((id: number) => {
        dispatch(cartItemsRemove(id))
    },
        [dispatch]
    )

    return [products,loading,error,changeQuanitiyHandler,removeItemHandler,userAccessToken,placeOrderStatus]
}

export default UseCart