import GridList from "@components/common/GridList/GridList"
import SectionTitle from "@components/common/SectionTitle/SectionTitle"
import Product from "@components/eCommerce/Products/Products"
import Loading from "@components/feedback/Loading/Loading"
import { TProducts } from "@customTypes/index"
import UseWishlist from "@hooks/UseWishlist"
import { Container } from "react-bootstrap"

const Wishlist = () => {
    const [loading,error,records]= UseWishlist()
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
