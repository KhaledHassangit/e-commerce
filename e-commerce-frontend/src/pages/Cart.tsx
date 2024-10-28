import SectionTitle from "@components/common/SectionTitle/SectionTitle"
import CartSubtotalPrice from "@components/eCommerce/Cart/CartSubtotalPrice"
import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import actGetProductsCartItems from "@store/cart/act/actGetProductsCartItems"
import Loading from "@components/feedback/Loading/Loading"
import CartItemList from "@components/common/GridList/CartItemList"
import { cartItemsChangeQuantity, cartItemsRemove, cleanCartproductsInfo } from "@store/cart/cartSlice"

const Cart = () => {
    
    const dispatch = useAppDispatch()
    const { items, productsInfo, loading, error } = useAppSelector((state) => state.cart)

    useEffect(() => {
        dispatch(actGetProductsCartItems())
        return() => {
            dispatch(cleanCartproductsInfo())
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
    return (
        <>
            <SectionTitle  title={`Cart`} />
            <Loading status={loading} error={error}>
                {products.length ? (
                    <>
                        <CartItemList
                        products={products}
                        changeQuanitiyHandler={changeQuanitiyHandler}
                        removeItemHandler={removeItemHandler} />
                    <CartSubtotalPrice products={products} />
                    </>
                ): <p>Your cart is empty</p>
            }
            </Loading>
        </>
    )
}

export default Cart
