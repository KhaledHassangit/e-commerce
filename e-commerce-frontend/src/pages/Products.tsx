import UseProducts from "@hooks/UseProducts"
import GridList from "@components/common/GridList/GridList"
import SectionTitle from "@components/common/SectionTitle/SectionTitle"
import Product from "@components/eCommerce/Products/Products"
import Loading from "@components/feedback/Loading/Loading"
import { TProducts } from "@customTypes/products"
import { memo} from "react"
import { Container, } from "react-bootstrap"

const Products = memo(() => {
    const [loading,error,ProductInfo,productPrefix] = UseProducts()

    return (
        <>
        <Container>
            <SectionTitle title={`${productPrefix?.toUpperCase()} Products`} />
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
