import Logo from "@/components/UI/Logo";
import Toastify from "@/components/UI/Toastify";

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <div className="grid md:grid-cols-2 min-h-screen">
                <div className="bg-auth bg-purple-950 bg-30 bg-no-repeat bg-left-bottom">
                    <div className="flex justify-center pt-10 md:pt-20">
                        <Logo/>
                    </div>
                </div>
                <div className="p-10 md:py-28">
                    {children}
                </div>
            </div>
            <Toastify/>
        </>
    );
  }
  