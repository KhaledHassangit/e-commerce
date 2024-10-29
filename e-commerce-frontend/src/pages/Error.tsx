import LottieHandler from '@components/common/Lottie/LottierHandler';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{marginTop:"10%"}} >
            <LottieHandler type="notFound" />
                <Link to="/" style={{ color: "black", fontWeight: "900" }} replace={true}>
                    How about going back to safety?
                </Link>
        </div>
    );
}

export default Error;
