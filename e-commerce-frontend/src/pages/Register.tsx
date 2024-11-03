import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Col, Row } from 'react-bootstrap';
import SectionTitle from '@components/common/SectionTitle/SectionTitle';
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema, TSignUp } from "@validations/SignUpSchema";
import Input from "@components/common/Forms/Input";
import useCheckEmailAvailability from "@hooks/UseCheckEmail";

const Register = () => {
    const { register, handleSubmit, getFieldState, trigger, formState: { errors } } = useForm<TSignUp>({
        mode: "onBlur",
        resolver: zodResolver(validationSchema)
    });

    const submitForm: SubmitHandler<TSignUp> = (data) => {
        console.log(data);
    };

    const { emailAvailabilityStatus, enteredEmail, checkEmailAvailability, resetCheckEmailAvailability } =
        useCheckEmailAvailability()

    const emailOnBlueHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
        await trigger("email")
        const value = e.target.value
        const { isDirty, invalid } = getFieldState("email")
        console.log(isDirty, invalid)
        if (isDirty && !invalid && enteredEmail !== value) {
            checkEmailAvailability(value)
        }
        if (isDirty && invalid && enteredEmail) {
            resetCheckEmailAvailability();
        }
    }
    return (
        <>
            <SectionTitle title="User Registration" />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form className="mt-4" onSubmit={handleSubmit(submitForm)}>

                        <Input
                            label="First Name"
                            name="firstName"
                            register={register}
                            error={errors.firstName?.message} />

                        <Input
                            label="Last Name"
                            name="lastName"
                            register={register}
                            error={errors.lastName?.message} />

                        <Input
                            label="Email Address"
                            name="email" type="text"
                            register={register}
                            onBlur={emailOnBlueHandler}
                            error={
                                errors.email?.message
                                    ? errors.email?.message
                                    : emailAvailabilityStatus === "notAvailable"
                                        ? "This email is already in use."
                                        : emailAvailabilityStatus === "failed"
                                            ? "Error from the server."
                                            : ""
                            }
                            formText={
                                emailAvailabilityStatus === "checking"
                                    ? "We're currently checking the availability of this email address. Please wait a moment."
                                    : ""
                            }
                            success={
                                emailAvailabilityStatus === "available"
                                    ? "This email is available for use."
                                    : ""
                            }
                            disabled={emailAvailabilityStatus === "checking" ? true : false}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            register={register}
                            error={errors.password?.message} />

                        <Input
                            label="Confirm Password"
                            name="confirmPassword" type="password"
                            register={register}
                            error={errors.confirmPassword?.message} />

                        <Button 
                        style={{ color: "white" }} 
                        variant="info" type="submit" 
                        className="my-3 px-5"
                        disabled={emailAvailabilityStatus === "checking" ? true : false}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Register;
