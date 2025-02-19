import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'CashTrackr - Reestablecer contraseña',
    description: 'CashTrackr - Reestablecer contraseña'
}

export default function ForgotPasswordPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">
                Aqui puedes  <span className="text-amber-500">reestablecerla</span>
            </p>

            <ForgotPasswordForm />

            <nav className="mt-10 flex flex-col gap-y-3">
                <Link
                    className="text-gray-500 text-center"
                    href='/auth/login'>
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>
                <Link
                    className="text-gray-500 text-center"
                    href='/auth/register'
                >
                    ¿No tienes una cuenta? Crea una
                </Link>
            </nav>
        </>
    );
};