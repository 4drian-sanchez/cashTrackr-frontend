"use server"
import getToken from "@/src/auth/token"
import { addExpenseSchema, Budget, ErrorResponseSchema, Expense } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type budgetAndExpenseId = {
    budgetId: Budget['id'],
    expenseId: Expense['id']
}

type stateActionType = {
    errors: string[]
    success: string
}

export default async function editExpense(
        {budgetId, expenseId} : budgetAndExpenseId,
        prevState: stateActionType,
        formData: FormData)
    {

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

    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount,
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

    revalidatePath(`admin/budgets/${budgetId}`)

    return {
        errors: [],
        success: json
    }
}