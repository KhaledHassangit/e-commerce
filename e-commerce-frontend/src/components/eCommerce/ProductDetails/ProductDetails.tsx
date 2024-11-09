import React from 'react'
import styles from "./styles.module.css"

type ProductDetails = {
    title: string;
    img: string;
    price: number;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    direction?: "row" | "column";
    quantity?: number;

}
const ProductDetails = ({title,img,price,children,style,direction = "row",quantity}: ProductDetails) => {

    return (
        <div className={`${styles[`product-${direction}`]}`} style={style}>
            <div className= {`${styles[`productImg-${direction}`]}`}>
                <img
                    src={img}
                    alt={title}
                />
            </div>
            <div className={`${styles[`productInfo-${direction}`]}`}>
                <h2 title={title}>{title}</h2>
                <h3>{price.toFixed(2)} EGP</h3>
                {quantity && <h3>Total Quantity: {quantity}</h3>}
                {quantity && <h3>Price Total: {(quantity * price).toFixed(2)}</h3>}
                {children}
            </div>
        </div>
        )
}

export default ProductDetails