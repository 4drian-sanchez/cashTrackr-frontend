import { cache } from "react"
import getToken from "../auth/token"
import { BudgetAPIResponseSchema } from "../schemas"
import { notFound } from "next/navigation"

export const getBudget = cache( async (budgetId : string) => {
  //Obetner el bodget por su id
  const url = `${process.env.API_URL}/budgets/${budgetId}`
  const token = getToken()
  const req = await fetch(url, {
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await req.json()

  if(!req.ok) {
    notFound()
  }
  const budget = BudgetAPIResponseSchema.parse(json)
  return budget
})