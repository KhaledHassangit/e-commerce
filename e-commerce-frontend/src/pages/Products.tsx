import GridList from "@components/common/GridList/GridList"
import SectionTitle from "@components/common/SectionTitle/SectionTitle"
import Product from "@components/eCommerce/Products/Products"
import Loading from "@components/feedback/Loading/Loading"
import { TProducts } from "@customTypes/products"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { getProductsByCat, productsCleanUp } from "@store/Products/ProductsSlice"
import { memo, useEffect } from "react"
import { Container, } from "react-bootstrap"
import { useParams } from "react-router"

const Products = memo(() => {
    const params = useParams()
    const dispatch = useAppDispatch()
    const { loading, error, records } = useAppSelector((state) => state.products)
    const WishListItemsId = useAppSelector((state) => state.wishlist.wishlistIds)
    const cartItems = useAppSelector((state) => state.cart.items)
    
    const ProductInfo = records.map((prod) => ({
        ...prod,
        quantity: cartItems[prod.id],
        isLiked:WishListItemsId.includes(prod.id)

    }))
    useEffect(() => {
        dispatch(getProductsByCat(params.prefix as string))
        return () => {
            dispatch(productsCleanUp())
        }
    }, [dispatch, params])

    return (
        <>
        <Container>
            <SectionTitle title={`${params.prefix?.toUpperCase()} Products`} />
            <Loading status={loading} error={error}>
                <GridList<TProducts>
                    records={ProductInfo}
                    renderItem={(item) => <Product {...item} />} />
            </Loading>
        </Container>
        </>
    )
})

export default Products
