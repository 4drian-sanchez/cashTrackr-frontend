"use server"

import { ErrorResponseSchema, ForgotPasswordSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}

export default async function forgotPassword(prevState : ActionStateType, formData : FormData) {
    const forgotPassword = ForgotPasswordSchema.safeParse({
        email: formData.get('email')
    })

    if(!forgotPassword.success) {
        return {
            errors : forgotPassword.error.errors.map(error => error.message),
            success: ''
        }
    }

    const url =  `${process.env.API_URL}/auth/forgot-password`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(forgotPassword.data)
    })

    const json : string = await req.json()

    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }

    return {
        errors: [],
        success: json
    }
}