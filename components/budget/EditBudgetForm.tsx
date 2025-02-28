"use client"
import { Budget } from "@/src/schemas";
import BudgetForm from "./BudgetForm";
import editForm from "@/actions/edit-budget-action";
import { useFormState } from "react-dom";
import ErrorMessage from "../UI/ErrorMessage";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditBudgetForm({budget} : {budget: Budget }) {

  const route = useRouter()
  const editFormWithBudgetId = editForm.bind(null, budget.id)
  const [state, dispatch] = useFormState(editFormWithBudgetId, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if(state.success) {
      toast.success(state.success)
      route.push('/admin')
    }
  }, [state]);

  return (
    <>
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >
        {state.errors && state.errors.map(error => (
          <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}
        <BudgetForm budget={budget}/>
    <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Guardar cambios'
      />
    </form>
    </>
  );
};