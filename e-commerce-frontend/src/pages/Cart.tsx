import SectionTitle from "@components/common/SectionTitle/SectionTitle"
import CartSubtotalPrice from "@components/eCommerce/Cart/CartSubtotalPrice"
import Loading from "@components/feedback/Loading/Loading"
import CartItemList from "@components/common/GridList/CartItemList"
import UseCart from "@hooks/UseCart"
import LottieHandler from "@components/common/Lottie/LottierHandler"

const Cart = () => {
    const [products,loading,error,changeQuanitiyHandler,removeItemHandler] = UseCart()
    
    return (
        <>
            <SectionTitle  title={`Cart`} />
            <Loading status={loading} error={error}  type="cart" >
                {products.length ? (
                    <>
                        <CartItemList
                        products={products}
                        changeQuanitiyHandler={changeQuanitiyHandler}
                        removeItemHandler={removeItemHandler} />
                    <CartSubtotalPrice products={products} />
                    </>
                ): <LottieHandler type="empty" message="Your Cart Is Empty"/>
            }
            </Loading>
        </>
    )
}

export default Cart
