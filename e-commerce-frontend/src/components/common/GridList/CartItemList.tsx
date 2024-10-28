import CartItem from "@components/eCommerce/Cart/Cartitem"
import { TProducts } from "@customTypes/index"



type CartItemsListProps = {
    products:TProducts[];
    changeQuanitiyHandler:(id:number,quantity:number) => void
    removeItemHandler:(id:number) => void

}
const CartItemList = ({products ,changeQuanitiyHandler,removeItemHandler} :CartItemsListProps) => {
    const CartList = products.map((element)=> <CartItem 
        changeQuanitiyHandler={changeQuanitiyHandler}
        removeItemHandler={removeItemHandler}
        key={element.id} {...element}/>)
    return (
        <>
        {CartList}
        </>
    )
}

export default CartItemList
