import { useSession, signIn } from "next-auth/react";
import { SSection } from "../_components/SSection";
import { redirect } from "next/navigation";
import Loading from "./loading";

export default  function Content() {
    const { data: session, status/*Loading */ } = useSession();
    
    if (status === 'loading') {
        return <Loading/>
        
    } else if (status === 'authenticated' && session){
        redirect('/administrator/dashboard')
    } else if (status === 'unauthenticated'){
        return (
            <>
                <Login />
            </>
        );
    }
}


const Login = () => {
    return (
        <main>
            <div
                style={{ width: "fit-content", height: "100vh" }}
                className="m-auto "
            >
                <SSection>
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <button
                                className="px-3 bg-slate-200 text-2xl rounded-lg w-full"
                                onClick={() => signIn("google", {callbackUrl: '/administrator/dashboard'})}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </SSection>
            </div>
        </main>
    );
};
