import { memo, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProducts } from "@customTypes/index";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/svg/like.svg?react"
import LikeFill from "@assets/svg/like-fill.svg?react"
import { LikeActionToggle } from "@store/wishlist/LikeAction";

const { product, productImg, wishlistBtn } = styles;

const Product = memo(({ id, title, price, img, max, quanitiy, isLiked }: TProducts) => {

    const RemainQuantity = max - (quanitiy ?? 0)
    const QuantityReachedToMax = RemainQuantity <= 0 ? true : false

    const [isDisabled, setIsDisabled] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    console.log(QuantityReachedToMax)
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
        if(isLoading){
            return
        }
        setIsLoading(true)
        dispatch(LikeActionToggle(id))
        .unwrap()
        .then(()=> setIsLoading(false))
        .catch(()=> setIsLoading(false))
        
    }
    return (
        <div className={product}>
            <div className={wishlistBtn} onClick={LikeHandler}>
                {
                    isLoading ? (
                        <Spinner animation="border" size="sm" variant="primary" />
                    ) : (
                        isLiked ? <LikeFill /> : <Like />
                    )
                }

            </div>
            <div className={productImg}>
                <img
                    src={img}
                    alt={title}
                />
            </div>
            <h2>{title}</h2>
            <h3>{price.toFixed(2)} EGP </h3>
            <span>{QuantityReachedToMax ? "You reach to the limit" : `${RemainQuantity} items left to add`}</span>
            <Button disabled={isDisabled || QuantityReachedToMax} onClick={addToCartHandler} variant="info" style={{ color: "white" }}>
                {isDisabled ? <Spinner animation="border" size="sm" /> : "Add to cart"}
            </Button>
        </div>
    );
});

export default Product;