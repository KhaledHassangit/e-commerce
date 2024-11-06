import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/Auth/authslice";
import { SubmitHandler } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TSignIn } from "@validations/SignInSchema";
import { useEffect } from "react";

const useLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, loading, accessToken } = useAppSelector((state) => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();

    const submitForm: SubmitHandler<TSignIn> = (data) => {
        if (searchParams.get("message")) {
            setSearchParams("");
        }
        dispatch(actAuthLogin(data)).unwrap().then(() => {
            navigate("/");
        });
    };

    useEffect(() => {
        return () => {
            dispatch(resetUI());
        };
    }, [dispatch]);


    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

    return { error, loading, searchParams, submitForm };
};

export default useLogin;
