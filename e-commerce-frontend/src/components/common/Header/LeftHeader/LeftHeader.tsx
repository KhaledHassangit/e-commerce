import { useAppSelector } from "@store/hooks";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import CartIcon from "@assets/svg/cart.svg?react";
import styles from "./styles.module.css";
import { getCartTotalQuantity } from "@store/cart/selectors/Selectors";

const { headerLeftBar } = styles;

const HeaderLeftBar = () => {
    const wishlistTotalQuantity = useAppSelector(
        (state) => state.wishlist.wishlistIds.length
    );
    const cartTotalQuantity = useAppSelector(getCartTotalQuantity);

    return (
        <div className={headerLeftBar}>
            <HeaderCounter
                to="wishlist"
                title="Wishlist"
                totalQuantity={wishlistTotalQuantity}
                svgIcon={<WishlistIcon title="wishlist" />}
            />
            <HeaderCounter
                to="cart"
                title="Cart"
                totalQuantity={cartTotalQuantity}
                svgIcon={<CartIcon title="cart" />}
            />
        </div>
    );
};

export default HeaderLeftBar;