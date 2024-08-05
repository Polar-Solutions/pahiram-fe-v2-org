"use client";

import Link from "next/link";
import {LogOut, Settings, User} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// import {useUser} from "@/hooks/use-user";
import {UserState, useUserStore} from "@/hooks/useUser";
import {clearCookies} from "@/server/actions/clearCookies";
import {startTransition} from "react";
import {useRouter} from "next/navigation";

export function UserNav() {
    const user = useUserStore((state: unknown) => (state as UserState).userData);
    const handleSignout = useUserStore((state: unknown) => (state as UserState).handleSignout);

    const router = useRouter();

    return (
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
                                    <AvatarImage src="#" alt="Avatar"/>
                                    <AvatarFallback className="bg-transparent">{user?.avatarName || ""}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.fullName || ""}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email || "User has no email"}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/settings" className="flex items-center">
                            <Settings className="w-4 h-4 mr-3 text-muted-foreground"/>
                            Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/account" className="flex items-center">
                            <User className="w-4 h-4 mr-3 text-muted-foreground"/>
                            Account
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {
                    // TODO: Replace with loading animation
                    startTransition(() => {
                        handleSignout();
                        clearCookies();
                        router.replace("/");
                    });
                }}
                >
                    <LogOut className="w-4 h-4 mr-3 text-muted-foreground"/>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
