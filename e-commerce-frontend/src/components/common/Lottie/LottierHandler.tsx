import Lottie from "lottie-react";
import empty from "@assets/animations/empty.json"
import notFound  from "@assets/animations/notfound.json"
import loading from "@assets/animations/loading.json"
import error from "@assets/animations/error.json"
import success from "@assets/animations/success.json"


const lottieFilesMap = {
    notFound,
    empty,
    loading,
    error,
    success,
}; 
type LottieHandlerProps = {
    type: keyof typeof lottieFilesMap;
    message?: string;
    className?: string; 
};

const LottieHandler = ({ type, message, className }: LottieHandlerProps) => {
        const lottie = lottieFilesMap[type];
        const messageStyle =
        type === "error"
        ? { fontSize: "19px", color: "red" }
        : { fontSize: "19px", marginTop: "30px"};
    return (
        <div className={`d-flex flex-column align-items-center ${className}`}>
            <Lottie animationData={lottie} style={{width:"400px"}}/>
            {message && <h3 style={messageStyle}>{message}</h3>}
        </div>
    )
}

export default LottieHandler