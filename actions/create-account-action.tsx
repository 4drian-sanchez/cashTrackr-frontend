"use server"

import { ErrorResponseSchema, registerSchema } from "@/src/schemas"

type prevData = {
    errors: string[];
    success: string
}

export default async function register(prevData : prevData, formData : FormData) {
    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    }
    
    //validation
    const register = registerSchema.safeParse(registerData)
    
    if(!register.success) {
        const errors = register.error.errors.map( error => error.message)
        return {
            errors,
            success: ''
        }
    }
    //Create account
    const url = `${process.env.API_URL}/auth/create-account`
    
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: register.data.name,
            email: register.data.email,
            password: register.data.password,
        })
    })

    const json : string = await req.json()

    if(req.status === 409) {
        
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