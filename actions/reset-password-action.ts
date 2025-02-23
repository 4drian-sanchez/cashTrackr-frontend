"use server"
import { ErrorResponseSchema, ResetPasswordSchema } from "@/src/schemas"

type StateActionType = {
    errors: string[]
    success: string
}

export default async function resetPassword( token : string, prevState : StateActionType, formData : FormData) {

    const resetPassword = {
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    }

    const resetPasswordResult = ResetPasswordSchema.safeParse(resetPassword)
    if(!resetPasswordResult.success) {
        return {
            errors: resetPasswordResult.error.errors.map( error => error.message ),
            success: ''
        }
    }

    console.log(resetPasswordResult.data.password)

    const url = `${process.env.API_URL}/auth/reset-password/${token}`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            password: resetPasswordResult.data.password
        })
    })


    const json : string = await req.json()
    
    if(!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
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