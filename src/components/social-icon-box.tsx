import Link from "next/link"

import { cn } from "@/lib/utils";

interface SocialIconBoxProps {
    icon: React.ReactNode;
    href: string;
    color?: string;
}

export const SocialIconBox = ({ icon, href, color }: SocialIconBoxProps) => {
    return (
        <Link href={href} className={cn("border border-transparent p-1 rounded-md text-[#3b5998] hover:border-primary hover:text-white hover:bg-primary transition-all duration-300", color)}>
            {icon}
        </Link>
    )
}