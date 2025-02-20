import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
    title: 'CashTrackr - Iniciar sesión',
    description: 'CashTrackr - Inicia sesión en CashTrackr'
}

export default function LoginPage() {

    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Inicia Sesión</h1>
            <p className="text-3xl font-bold">
                y controla tus  <span className="text-amber-500">finanzas</span>
            </p>

            <LoginForm/>

            <nav className="mt-10 flex flex-col gap-y-3">
                <Link 
                    className="text-gray-500 text-center" 
                    href='/auth/register'>
                    ¿No tienes una cuenta? Crea una
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