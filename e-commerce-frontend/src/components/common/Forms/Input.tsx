import { Form } from 'react-bootstrap';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps<TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>;
    label: string;
    type?: string;
    register: UseFormRegister<TFieldValues>;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    formText?: string
    success?: string;
    disabled?: boolean;
}


const Input = <TFieldValues extends FieldValues>({
    label,
    type = "text",
    register,
    name,
    error,
    onBlur,
    formText,
    success,
    disabled
}: InputProps<TFieldValues>) => {

    const onBlueHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e)
            register(name).onBlur(e)
        } else {
            register(name).onBlur(e)
        }
    }
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                {...register(name)}
                isInvalid={!!error}
                onBlur={onBlueHandler}
                isValid={!!success}
                disabled={disabled}/>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
            {formText && <Form.Text muted>{formText}</Form.Text>}
        </Form.Group>)
}

export default Input