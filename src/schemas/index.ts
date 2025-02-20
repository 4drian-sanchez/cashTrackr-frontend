import { z } from "zod"

export const registerSchema = z.object({
    email: z.string()
        .min(1, {message: 'El Email es obligatorio'})
        .email({message: 'Email no válido'}),
    name: z.string()
        .min(1, {message: 'Tu nombre no puede ir vacio'}),
    password: z.string()
        .min(8, {message: 'El password es muy corto, mínimo 8 caracteres'}),
    password_confirmation: z.string()
}).refine( (data) => data.password === data.password_confirmation, {
    message: 'Los passwords no son iguales',
    path: ['password_confirmation']
})

export const ErrorResponseSchema = z.object({
    error: z.string()
})

export const tokenSchema = z.string().length(6, {message: 'Token bo válido'})

export const authenticateSchema = z.object({
    email: z.string()
            .min(1, {message: 'El email es obligatorio'})
            .email({message: 'Email no válido'}),
    password: z.string().min(6, {message: 'La contraseña es obligatoria'})
})

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export type User = z.infer< typeof UserSchema >