import { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { SignInForm } from "@/features/auth/components/sign-in-form";
import { getCurrent } from "@/features/auth/action";

export const metadata: Metadata = {
    title: "Basabaree | Sign In",
    description: "Sign in to your account",
}

const SignIn = async () => {
    const user = await getCurrent();

    if (user) {
        redirect("/");
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full max-w-screen-xl mx-auto grid md:grid-cols-2 gap-6">
                <div className="hidden md:block w-full aspect-video relative">
                    <Image src="/auth-banner.png" alt="Sign in" fill className="object-contain" />
                </div>
                <SignInForm />
            </div>
        </Suspense>
    )
}

export default SignIn