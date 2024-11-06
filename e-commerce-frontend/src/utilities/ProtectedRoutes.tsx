import { Navigate } from "react-router"
import {  useAppSelector } from "@store/hooks";

const ProtectedRoutes = ({children}:{children:React.ReactNode}) => {
    const { accessToken } = useAppSelector((state) => state.auth);

    if(!accessToken){
        return <Navigate to="/login?message=login_required"/>
    }
    return (
        <>
        {children}
        </>
    )
}

export default ProtectedRoutes