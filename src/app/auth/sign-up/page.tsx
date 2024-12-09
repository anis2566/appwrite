import { Metadata } from "next"
import Image from "next/image";
import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/action";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const metadata: Metadata = {
    title: "Basabaree | Sign Up",
    description: "Create your account"
}

const SignUp = async () => {
    const user = await getCurrent();

    if (user) {
        redirect("/");
    }

    return (
        <div className="w-full max-w-screen-xl mx-auto grid md:grid-cols-2 gap-6">
            <SignUpForm />
            <div className="hidden md:block w-full aspect-video relative">
                <Image src="/auth-banner.png" alt="Sign in" fill className="object-contain" />
            </div>
        </div>
    )
}

export default SignUp;