"use server"

import getToken from "@/src/auth/token"
import { addExpenseSchema, ErrorResponseSchema } from "@/src/schemas"

type StateActionType = {
    errors: string[]
    success: string
}
export default async function addExpense( budgetId: number, prevState: StateActionType, formData: FormData ) {

    const expenseData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const expense = addExpenseSchema.safeParse(expenseData)
    if(!expense.success) {
        return {
            errors: expense.error.errors.map(error => error.message),
            success: ''
        }
    }

    //Crear nuevo gasto
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
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
        errors: [],
        success: json
    }
}