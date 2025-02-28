"use server"

import getToken from "@/src/auth/token"
import { DraftBudgetSchema } from "@/src/schemas"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

type StateActionTypes = {
    errors: string[]
    success: string
}
export default async function createBudget(prevState: StateActionTypes, formData: FormData) {
    const budget = DraftBudgetSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })
    if (!budget.success) {
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const token = getToken()
    const url = `${process.env.API_URL}/budgets`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount,
        })
    })

    const json :string = await req.json()
    revalidateTag('/all-budgets')

    return {
        errors: [],
        success: json
    }
}