"use server"

import { ErrorResponseSchema, tokenSchema } from "@/src/schemas"

type prevDataTypes = {
    errors: string[]
    success: string
}

export default async function confirmAccount(token : string, prevData : prevDataTypes) {

    const tokenResult = tokenSchema.safeParse(token)
    if(!tokenResult.success) {
        return {
            errors: tokenResult.error.errors.map(error => error.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/auth/confirm-account`
    
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            token: tokenResult.data
        })
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
        errors : [],
        success: json
    }
}