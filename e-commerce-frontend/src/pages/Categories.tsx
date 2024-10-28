import Category from "@components/eCommerce/Category/Category"
import { Container } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { cleanUpCategories, getCategories } from "@store/Categories/CategoriesSlice"
import { useEffect } from "react"
import Loading from "@components/feedback/Loading/Loading"
import GridList from "@components/common/GridList/GridList"
import SectionTitle from "@components/common/SectionTitle/SectionTitle"

const Categories = () => {
    const dispatch = useAppDispatch()
    const { loading, error, records } = useAppSelector((state) => state.categories)
    useEffect(() => {
            dispatch(getCategories())
        return () =>{ 
            dispatch(cleanUpCategories())
        }
    }, [dispatch])

    return (
        <Container>
            <SectionTitle  title={`Categories`} />
            <Loading status={loading} error={error}>
                <GridList records={records} renderItem={(cat) => <Category  {...cat} />} />
            </Loading>
        </Container>
    )
}

export default Categories
