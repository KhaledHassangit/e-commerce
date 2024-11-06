import { Button, Form, Col, Row ,Alert, Spinner} from 'react-bootstrap';
import SectionTitle from '@components/common/SectionTitle/SectionTitle';
import Input from '@components/common/Forms/Input';
import { useForm,  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema, TSignIn } from "@validations/SignInSchema";
import UseLogin from '@hooks/UseLogin';

const Login = () => {
    const {error,loading,searchParams,submitForm} = UseLogin()
    
    const { register, handleSubmit, formState: { errors } } = useForm<TSignIn>({
        mode: "onBlur",
        resolver: zodResolver(validationSchema)
    });

    return (
        <>
            <SectionTitle title='User Login' />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                {
                    searchParams.get("message") === "account_created" && 
                    (<Alert variant='success'>Your Account Created Successfully , Login Now!</Alert>)
                }
                {
                    searchParams.get("message") === "login_required" && 
                    (<Alert variant='success'>You Need to Login Your Account!</Alert>)
                }
                    <Form className='mt-4'  onSubmit={handleSubmit(submitForm)}>
                    <Input label="Email Address" name="email" type="text" register={register} error={errors.email?.message} />
                    <Input label="Password" name="password" type="password" register={register} error={errors.password?.message} />
                    <Button
                            style={{ color: "white" }}
                            variant="info"
                            type="submit"
                            className="my-3 px-5"
                            disabled={loading === "pending"}>
                            {loading === "pending" ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                        {error && <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>}

                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Login
