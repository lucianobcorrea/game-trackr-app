import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const registerSchema = toTypedSchema(z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
    terms: z.boolean().refine((value) => value, {
        message: "You must accept the terms and conditions",
        path: ["terms"],
    })
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
}))

export const loginSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(6),
}))