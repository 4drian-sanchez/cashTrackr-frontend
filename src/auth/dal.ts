import 'server-only' // Aseguramos que el código sea solo del servidor
import {cache} from 'react'
import { cookies } from "next/headers";
import {redirect} from 'next/navigation'
import { UserSchema } from "../schemas";
import getToken from './token';

export  const verifySession = cache( async () => {
    const token = getToken()
    if(!token) {
        redirect('/auth/login')
    }
    
    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const result = await req.json()
    const user = UserSchema.safeParse(result)

    if(!user.success) {
        redirect('/auth/login')
    }

    return {
        isAuth: true,
        user: user.data
    }
})