"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = () => {
    cookies().delete('CASHTRAKR-TOKEN')
    redirect('/auth/login')
}