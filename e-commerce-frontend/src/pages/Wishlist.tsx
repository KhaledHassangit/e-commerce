import GridList from "@components/common/GridList/GridList"
import SectionTitle from "@components/common/SectionTitle/SectionTitle"
import Product from "@components/eCommerce/Products/Products"
import Loading from "@components/feedback/Loading/Loading"
import { TProducts } from "@customTypes/products"
import { useAppDispatch ,useAppSelector } from "@store/hooks"
import {actGetWishlist  ,CleanWishlistProducts} from "@store/wishlist/wishlistSlice"
import { useEffect } from "react"
import { Container } from "react-bootstrap"
const Wishlist = () => {
    const dispatch = useAppDispatch()
    const {loading , error,productsInfo} = useAppSelector((state)=> state.wishlist)
    const cartItems = useAppSelector((state) => state.cart.items)

    useEffect(() => {
        dispatch(actGetWishlist())
        return ()=>{
            dispatch(CleanWishlistProducts())
        }
    }, [dispatch])
    const records = productsInfo.map((prod) => ({
        ...prod,
        quantity: cartItems[prod.id],
        isLiked:true

    }))

    return (
        <Container>
            <SectionTitle  title={`Wishlist`} />
            <Loading status={loading} error={error}>
                <GridList<TProducts>
                    records={records}
                    renderItem={(item) => <Product {...item} />} />
            </Loading>
        </Container>
    )
}

export default Wishlist
