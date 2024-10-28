import { TLoading } from "@customTypes/index"


type LoadingProps  = {
    status : TLoading;
    error: string | null;
    children:React.ReactNode
}

const Loading = ({status,error,children}:LoadingProps) => {
    if(status === "pending"){
        return <p>loading ...</p>
    }
    if(status === "failed"){
        return <p>{error}</p>
    }

    return (
        <>
        {children}
        </>
    )
}

export default Loading
