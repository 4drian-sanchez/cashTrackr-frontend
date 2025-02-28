"use client"

import { useRouter } from "next/navigation";

export default function AddExpenseButton() {

    const router = useRouter()

  return (
    <button
    type="button"
    className="px-10 py-2 bg-amber-500 rounded-md text-white font-bold cursor-pointer"
    onClick={() => router.push('?addExpense=true&showModal=true')}
    >
        Agregar Gasto
    </button>
  );
};