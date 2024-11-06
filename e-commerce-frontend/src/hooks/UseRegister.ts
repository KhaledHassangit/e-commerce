import { actAuthRegister, resetUI } from "@store/Auth/authslice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { TSignUp } from "@validations/SignUpSchema";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

const UseRegister = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, loading , accessToken } = useAppSelector((state) => state.auth);

    const submitForm: SubmitHandler<TSignUp> = (data) => {
        const { firstName, lastName, email, password } = data;
        dispatch(actAuthRegister({ firstName, lastName, email, password }))
            .unwrap()
            .then(() => {
                navigate("/login?message=account_created");
            });
    };
    useEffect(() => {
        return ()=>{
            dispatch(resetUI())}
    }, [dispatch])
    
    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

    return { error, loading, submitForm };
};

export default UseRegister;
