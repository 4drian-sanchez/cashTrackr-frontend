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

export const DraftBudgetSchema = z.object({
    name: z.string()
            .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
    amount: z.coerce.
            number({message: 'Cantidad no válida'})
            .min(1, {message: 'Cantidad no válida'}),
})

export const checkPasswordSchema = z.string().min(1, {message: 'El password no puede ir vacio'})

export const tokenSchema = z.string().length(6, {message: 'Token bo válido'})

export const authenticateSchema = z.object({
    email: z.string()
            .min(1, {message: 'El email es obligatorio'})
            .email({message: 'Email no válido'}),
    password: z.string().min(6, {message: 'La contraseña es obligatoria'})
})

export const ForgotPasswordSchema = z.object({
    email: z.string()   
            .min(1, {message: 'El Email es Obligatorio'})
            .email( {message: 'Email no válido'}),
})

export const ResetPasswordSchema = z.object({
    password: z.string()
            .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

export const BudgetAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const addExpenseSchema = z.object({
    name: z.string().min(1, {message: 'EL nombre es obligatorio'}),
    amount: z.coerce.number().min(1, {message: 'Cantidad no válida'})
})

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema)

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export type User = z.infer< typeof UserSchema >
export type Budget = z.infer<typeof BudgetAPIResponseSchema>