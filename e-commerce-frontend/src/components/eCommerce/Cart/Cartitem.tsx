import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProducts } from "@customTypes/index";
import { memo } from "react";
import ProductDetails from "../ProductDetails/ProductDetails";
const { cartItem , cartItemSelection } = styles;

type CartItemsProps = TProducts & 
{changeQuanitiyHandler:(id:number,quantity:number) => void}
    & {removeItemHandler:(id:number) => void}

const CartItem = memo(({id,title,price,img,max,quanitiy,changeQuanitiyHandler,removeItemHandler}:CartItemsProps) => {
    const renderOptions = Array(max).fill(0).map((_,index) => {
        const Leftquantity = ++index
        return (
            <option value={Leftquantity}>{Leftquantity}</option>
        )
    })
    const changeQuanitiy = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const quantity = +event.target.value;
        changeQuanitiyHandler(id,quantity)
    }

    return (
        <div className={cartItem}>
            <ProductDetails title={title} img={img} price={price} direction="column">
            <Button
                        variant="secondary"
                        style={{ color: "white",width:"100px"}}
                        className="mt-auto "onClick={()=> removeItemHandler(id)}>
                        Remove
                    </Button>
            </ProductDetails>
            <div className={cartItemSelection}>
                <span className="d-block mb-1">Quantity</span>
                <Form.Select onChange={changeQuanitiy} value={quanitiy} aria-label="Default select example">
                    {renderOptions}
                </Form.Select>
            </div>
        </div>
    );
});

export default CartItem;