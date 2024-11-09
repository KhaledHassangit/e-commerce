import { TLoading } from "@customTypes/index"
import CategorySkeleton from "../skeletons/CategorySkeleton"
import ProductSkeleton from "../skeletons/ProductSkeleton"
import CartSkeleton from "../skeletons/CartSkeleton"
import LottieHandler from "@components/common/Lottie/LottierHandler"
import TableSkeleton from "../skeletons/TableSkeleton"

const skeletonsType = {
    category:CategorySkeleton,
    product:ProductSkeleton,
    cart:CartSkeleton,
    table: TableSkeleton,
}

type LoadingProps  = {
    status : TLoading;
    error: string | null;
    children:React.ReactNode;
    type?:keyof typeof skeletonsType ;

}

const Loading = ({status,error,children, type = "category"}:LoadingProps) => {
    const Component = skeletonsType[type] 
    if(status === "pending"){
        return <Component/>
    }
    if(status === "failed"){
        return <LottieHandler type="error" message={error as string}/>
    }

    return (
        <>
        {children}
        </>
    )
}

export default Loading
