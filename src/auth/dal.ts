import {cache} from 'react'
import { cookies } from "next/headers";
import {redirect} from 'next/navigation'
import { UserSchema } from "../schemas";

export  const verifySession = cache( async () => {
    const jwtCookie = cookies().get('CASHTRAKR-TOKEN')
    if(!jwtCookie) {
        redirect('/auth/login')
    }
    const jwt = jwtCookie.value
    
    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${jwt}`
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