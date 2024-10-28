import { useAppDispatch, useAppSelector } from "@store/hooks"
import { cleanUpCategories, getCategories } from "@store/Categories/CategoriesSlice"
import { useEffect } from "react"

const UseGategories = () => {
    const dispatch = useAppDispatch()
    const { loading, error, records } = useAppSelector((state) => state.categories)
    useEffect(() => {
        const promise =  dispatch(getCategories())
        return () =>{ 
            promise.abort()
            dispatch(cleanUpCategories())
        }
    }, [dispatch])

    return [loading,error,records]
}

export default UseGategories
