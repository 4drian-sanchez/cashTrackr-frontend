"use client"

import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useParams } from "next/navigation";
import addExpense from "@/actions/add-expense-action";
import { useFormState } from "react-dom";
import ErrorMessage from "../UI/ErrorMessage";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AddExpenseForm({closeModal} : {closeModal : () => void}) {

    const {id: budgetId} = useParams()
    
    const addExpenseWithBudgetId = addExpense.bind(null, +budgetId)
    const [state, dispatch] = useFormState(addExpenseWithBudgetId, {
        errors: [],
        success: ''
    })
    
    useEffect(() => {
      if(state.success) {
        toast.success(state.success)
        closeModal()
      }
    
    }, [state]);

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">Llena el formulario y crea un {''}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >

        {state.errors && state.errors.map( error => (
            <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}

        <ExpenseForm/>
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Registrar Gasto'
        />
      </form>
    </>
  )
}