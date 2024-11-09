import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { TProducts } from "@customTypes/index";
import styles from "./styles.module.css"
import { useAppDispatch } from "@store/hooks";
import { actPlaceOrder } from "@store/orders/ordersSlice";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";

type TCartSubtotalPriceProps = {
    products: TProducts[] ;
    userAccessToken: string | null

}
const CartSubtotalPrice = ({ products, userAccessToken }: TCartSubtotalPriceProps) => {

    const subtotal = products.reduce((acc, el) => {
        const price = el.price
        const quantity = el.quanitiy
        if (quantity && typeof quantity === "number") {
            return acc + price * quantity
        } else {
            return acc;
        }
    }, 0)

    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const modalHandler = () => {
        setShowModal(!showModal);
        setError(null);
    };

    const placeOrderHandler = () => {
        setLoading(true);
        dispatch(actPlaceOrder(subtotal)).unwrap().then(() => {
            dispatch(clearCartAfterPlaceOrder())
            setShowModal(false)
        }).catch((error) => {
            setError(error)
        }).finally(() => setLoading(false))
    }

    return (
        <>
            <Modal show={showModal} onHide={modalHandler} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Placing Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to place order with Subtotal:{" "}
                    {subtotal.toFixed(2)} EGP
                    {!loading && error && (
                        <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalHandler}>
                        Close
                    </Button>
                    <Button
                        variant="info"
                        style={{ color: "white" }}
                        onClick={placeOrderHandler}
                    >
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm"></Spinner> Loading...
                            </>
                        ) : (
                            "Confirm"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className={styles.container}>
                <div>
                    <span>Subtotal:</span>
                    <span>{subtotal.toFixed(2)} EGP</span>
                </div>
                {userAccessToken && (
                    <div className={styles.container}>
                        <span>
                            <Button
                                onClick={modalHandler}
                                variant="info"
                                style={{ color: "white", width: "140px" }}>
                                Place order
                            </Button>
                        </span>
                    </div>
                )
                }
            </div>
        </>
    );
}

export default CartSubtotalPrice
