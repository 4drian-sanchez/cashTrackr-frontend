"use server"

import getToken from "@/src/auth/token"
import { Budget, checkPasswordSchema, ErrorResponseSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type StateActionType = {
    errors: string[]
    success: string
}
export default async function confirmPassword( budgetId: Budget['id'], prevState : StateActionType, formData: FormData ) {
    const password = checkPasswordSchema.safeParse(formData.get('password'))
    if(!password.success) {
        return {
            errors: password.error.issues.map( issue => issue.message),
            success: ''
        }
    }
    
    const token = getToken()
    const checkPasswordURL = `${process.env.API_URL}/auth/check-password`
    const checkPasswordReq = await fetch(checkPasswordURL, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            password: password.data
        })

    })

    const checkPasswordJson = await checkPasswordReq.json()

    if(!checkPasswordReq.ok) {
        const {error} = ErrorResponseSchema.parse(checkPasswordJson)
        return {
            errors: [error],
            success: ''
        }
    }

    const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
    const deleteBudgetReq = await fetch(deleteBudgetUrl, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const deleteBudgetJson : string = await deleteBudgetReq.json()

    if(!deleteBudgetReq.ok) {
        const {error} = ErrorResponseSchema.parse(deleteBudgetJson)
        return {
            errors: [error],
            success: ''
        }
    }

    revalidatePath('/admin')

    return {
        errors: [],
        success: deleteBudgetJson
    }
}