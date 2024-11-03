import { z } from "zod";


const validationSchema = z.object({
    email: z.string()
        .min(1, { message: "Email Address is required" })
        .email({ message: "Invalid email address format" })
        .regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: "Invalid email address format" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" }),
})

type TSignIn = z.infer<typeof validationSchema>;


export { validationSchema, type TSignIn }