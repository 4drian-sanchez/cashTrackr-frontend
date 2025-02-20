"use server"
import {cookies} from 'next/headers'
import { redirect } from 'next/navigation'
import { authenticateSchema, ErrorResponseSchema } from "@/src/schemas"

export default async function authenticate( prevState : any, formData: FormData ) {

    const credentials = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const credentialsResult = authenticateSchema.safeParse(credentials)
    if(!credentialsResult.success) {
        return {
            errors: credentialsResult.error.errors.map( error => error.message )
        }
    }

    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentialsResult.data)
    })

    const json = await req.json()
    
    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error]
        }
    }

    cookies().set({
        name: 'CASHTRAKR-TOKEN',
        value: json,
        httpOnly: true,
        path: '/'
    })
    
    redirect('/admin')
}