import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
    title: 'CashTrackr - Crear cuenta',
    description: 'CashTrackr - Crear tu cuenta en CashTrackr'
}

export default function RegisterPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Crea tu cuenta</h1>
            <p className="text-3xl font-bold">
                y controla tus  <span className="text-amber-500">finanzas</span>
            </p>

            <RegisterForm/>

            <nav className="mt-10 flex flex-col gap-y-3">
                <Link 
                    className="text-gray-500 text-center" 
                    href='/auth/login'>
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>
                <Link 
                    className="text-gray-500 text-center" 
                    href='/auth/forgot-password'
                >
                    Olvidaste tu contraseña? Reestablece tu contraseña
                </Link>
            </nav>
        </>
    );
};