"use server"

import getToken from "@/src/auth/token"
import { Budget, DraftBudgetSchema, ErrorResponseSchema } from "@/src/schemas"
import {  revalidateTag } from "next/cache"

type StateActionTypes={
    errors: string[]
    success: string
}

export default async function editForm(budgetId: Budget['id'], prevState: StateActionTypes, formData: FormData) {

    const editBudgetInputs = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const budget = DraftBudgetSchema.safeParse(editBudgetInputs)
    if(!budget.success) {
        return {
            errors: budget.error.errors.map(error => error.message) ,
            success: ''
        }
    }

    const url = `${process.env.API_URL}/budgets/${budgetId}`
    const token = getToken()

    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount
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

    //Quita el chache de /admin y muestra los cambios
    revalidateTag('/all-budgets')
    return {
        errors: [],
        success: json
    }
}; 