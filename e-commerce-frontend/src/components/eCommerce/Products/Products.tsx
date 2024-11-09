import { memo, useEffect, useState } from "react";
import { Button, Spinner, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProducts } from "@customTypes/index";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/svg/like.svg?react"
import LikeFill from "@assets/svg/like-fill.svg?react"
import { LikeActionToggle } from "@store/wishlist/LikeAction";
import ProductDetails from "../ProductDetails/ProductDetails";
const {  wishlistBtn } = styles;

const Product = memo(({ id, title, price, img, max, quanitiy, isLiked, isAuthenticated }: TProducts) => {

    const RemainQuantity = max - (quanitiy ?? 0)
    const QuantityReachedToMax = RemainQuantity <= 0 ? true : false

    const [isDisabled, setIsDisabled] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!isDisabled) {
            return
        }
        setIsDisabled(true)
        const debounce = setTimeout(() => {
            setIsDisabled(false)
        }, 300);
        return () => clearTimeout(debounce)
    }, [isDisabled])

    const addToCartHandler = () => {
        dispatch(addToCart(id))
        setIsDisabled(true)
    }

    const LikeHandler = () => {
        if (isAuthenticated) {
            if (isLoading) {
                return
            }
            setIsLoading(true)
            dispatch(LikeActionToggle(id))
                .unwrap()
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
        } else {
            setShowModal(true)
        }

    }
    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to login first to add this item to your wishlist.
                </Modal.Body>
            </Modal>

            <ProductDetails title={title} img={img} price={price} direction="row">
                <div className={wishlistBtn} onClick={LikeHandler}>
                    {
                        isLoading ? (
                            <Spinner animation="border" size="sm" variant="primary" />
                        ) : (
                            isLiked ? <LikeFill /> : <Like />
                        )
                    }
                 </div>
                {/* <span>{QuantityReachedToMax ? "You reach to the limit" : `${RemainQuantity} items left to add`}</span> */}
                <Button disabled={isDisabled || QuantityReachedToMax} onClick={addToCartHandler} variant="info" style={{ color: "white",width:"100%" }}>
                    {isDisabled ? <Spinner animation="border" size="sm" /> : "Add to cart"}
                </Button>
            </ProductDetails>
        </>
    );
});

export default Product;