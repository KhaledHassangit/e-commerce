import { Button, Form, Col, Row } from 'react-bootstrap';
import SectionTitle from '@components/common/SectionTitle/SectionTitle';
import Input from '@components/common/Forms/Input';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema, TSignIn } from "@validations/SignInSchema";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TSignIn>({
        mode: "onBlur",
        resolver: zodResolver(validationSchema)
    });

    const submitForm: SubmitHandler<TSignIn> = (data) => {
        console.log(data);
    };

    return (
        <>
            <SectionTitle title='User Login' />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form className='mt-4'  onSubmit={handleSubmit(submitForm)}>
                    <Input label="Email Address" name="email" type="text" register={register} error={errors.email?.message} />
                    <Input label="Password" name="password" type="password" register={register} error={errors.password?.message} />
                        <Button style={{color:"white"}} variant="info" type="submit" className='my-3  px-5'>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Login
