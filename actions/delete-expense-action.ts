"use server"

import getToken from "@/src/auth/token"
import { Budget, ErrorResponseSchema, Expense } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type StateActionTypes = {
    errors: string[]
    success: string
}
type BudgetIdWithExpenseId = {
    budgetId: Budget['id']
    expenseId: Expense['id']
}

export default async function deleteExpense(
    {budgetId, expenseId}: BudgetIdWithExpenseId,
    prevState: StateActionTypes
) {

    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const token = getToken()
    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    const json : string = await req.json()
    console.log(json)
    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }

    revalidatePath(`/admin/budgets/${budgetId}`)

    return {
        errors: [],
        success: json
    }
}