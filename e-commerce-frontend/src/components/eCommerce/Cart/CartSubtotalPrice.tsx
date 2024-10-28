import { TProducts } from "@customTypes/products";
import styles from "./styles.module.css"

type TCartSubtotalPriceProps = {products:TProducts[]}
const CartSubtotalPrice = ({products}:TCartSubtotalPriceProps) => {
    const subtotal = products.reduce((acc,el) => {
        const price = el.price
        const quantity = el.quanitiy
        if(quantity && typeof quantity === "number"){
            return acc + price * quantity 
        } else{
            return acc; 
        }
    },0)
    return (
        <div className={styles.container}>
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)} EGP</span>
        </div>
    );


}

export default CartSubtotalPrice
