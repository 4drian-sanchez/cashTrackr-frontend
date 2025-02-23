import BudgetMenu from "@/components/budget/BudgetMenu";
import { formatDate, formatToDollar } from "@/src/auth/format";
import getToken from "@/src/auth/token";
import { BudgetsAPIResponseSchema } from "@/src/schemas";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { number } from "zod";

export const metadata: Metadata = {
    title: 'CashTrackr - Panel de administrador',
    description: 'CashTrackr - Panel de administrador'
}

export async function getUserBudgets() {
    const url = `${process.env.API_URL}/budgets`

    const token = getToken()

    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()

    const budgets = BudgetsAPIResponseSchema.parse(json)
    return budgets
}

export default async function AdminPage() {

    const budgets = await getUserBudgets()

    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className="font-black text-4xl text-purple-950 my-5">Mis Presupuestos</h1>
                    <p className="text-xl font-bold">Maneja y administra tus {''}
                        <span className="text-amber-500">presupuestos</span>
                    </p>

                </div>

                <Link
                    href={'/admin/budgets/new'}
                    className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Crear Presupuesto
                </Link>
            </div>

            <div>
                {budgets.length ? (

                    <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
                        {budgets.map((budget) => (
                            <li key={budget.id} className="flex justify-between gap-x-6 p-5 ">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-4">

                                        <Link 
                                            href={`/admin/budgets/${budget.id}`}
                                            className="text-5xl font-black leading-6 text-gray-900">
                                                { budget.name }
                                        </Link>

                                        <p className="text-2xl font-bold text-amber-500">
                                            {formatToDollar(+budget.amount)  }
                                        </p>
                                        <p className='text-gray-500  text-sm'>
                                            útima actualización: 
                                            <span className="font-bold">{formatDate(budget.updatedAt)}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-6">
                                    <BudgetMenu budgetId={+budget.id}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Link href={'/admin/budget/create'}>Empieza creando uno</Link>
                )}
            </div>
        </>
    );
};