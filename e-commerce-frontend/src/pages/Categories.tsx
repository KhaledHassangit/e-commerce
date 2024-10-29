import Category from "@components/eCommerce/Category/Category"
import { Container } from "react-bootstrap"
import Loading from "@components/feedback/Loading/Loading"
import GridList from "@components/common/GridList/GridList"
import SectionTitle from "@components/common/SectionTitle/SectionTitle"
import UseGategories from "@hooks/UseGategories"

const Categories = () => {
    const  [loading,error,records] = UseGategories()
    return (
        <Container>
            <SectionTitle  title={`Categories`} />
            <Loading status={loading} error={error} type="category" >
                <GridList
                    emptyMessage="There Are No Products Yet"
                    records={records} renderItem={(cat) => <Category  {...cat} />} />
            </Loading>
        </Container>
    )
}

export default Categories
