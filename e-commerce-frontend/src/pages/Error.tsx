import { Container } from 'react-bootstrap';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

const Error = () => {
    const error = useRouteError()
    let errorStatus: number;
    let errorSTatusText: string;

    if (isRouteErrorResponse(error)) {
        errorStatus = error.status
        errorSTatusText = error.statusText

    } else {
        errorStatus = 404;
        errorSTatusText = "Page Not Found";
    }
    return (
        <Container className="mt-4" style={{ paddingTop: "15%" }}>
            <div className='text-center '>
                <h1 style={{ fontWeight: "900", fontSize: "50px" }}>{errorStatus}</h1>
                <p>{errorSTatusText}</p>
                <Link to="/" style={{ color: "black", fontWeight: "900" }} replace={true}>
                    How about going back to safety?
                </Link>
            </div>
        </Container>
    );
}

export default Error;
