import { Logo } from "@/components/logo"
import { Navs } from "./navs"
import { Account } from "./account"

export const Navbar = () => {
    return (
        <div className="w-full bg-background px-3 py-2 border-b sticky top-0 z-50 h-16">
            <div className="flex items-center justify-between h-full">
                <Logo callbackUrl="/" />
                <Navs />
                <Account />
            </div>
        </div>
    )
}