"use client"

import { Loader2, Megaphone, PlusCircle } from "lucide-react"
import Link from "next/link"
import { User, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import { useCurrent } from "@/features/auth/api/use-current"
import { useLogout } from "@/features/auth/api/use-logout"

export const Account = () => {
    const { data: user, status } = useCurrent()

    const { mutate: logout } = useLogout()

    const handleSignOut = () => {
        logout();
    };

    if (status === "pending") {
        return <Loader2 className="animate-spin h-5 w-5" />
    }

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Button variant="link" asChild>
                    <Link href="/auth/sign-in">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/auth/sign-up">Get Started</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <Button variant="default" asChild className="max-w-fit">
                <Link href="/user/ad/new" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    New Ad
                </Link>
            </Button>
            <DropdownMenu>
                <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.avatar || ""} />
                                        <AvatarFallback className="bg-transparent">
                                            {user?.name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Account</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col">
                            <p className="text-sm font-medium leading-none">
                                {user.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>

                            <Separator className="my-2" />

                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-2xl text-primary">10</Badge>
                                <div>
                                    <p className="text-sm text-muted-foreground">Ad left</p>
                                    <Button variant="default" className="h-6">Buy More</Button>
                                </div>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="hover:cursor-pointer" asChild>
                            <Link href="/user/ad/new" className="flex items-center">
                                <PlusCircle className="mr-3 h-4 w-4 text-muted-foreground" />
                                New Ad
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:cursor-pointer" asChild>
                            <Link href="/user/ad" className="flex items-center">
                                <Megaphone className="mr-3 h-4 w-4 text-muted-foreground" />
                                Your Ads
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:cursor-pointer" asChild>
                            <Link href="/user/profile" className="flex items-center">
                                <User className="mr-3 h-4 w-4 text-muted-foreground" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={handleSignOut}
                    >
                        <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
