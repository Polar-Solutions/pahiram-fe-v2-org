"use client";
import {useAction} from "next-safe-action/hooks";
import {logoutUserAction} from "@/core/actions/authentication";
import {UserState, useUserStore} from "@/hooks/stores/useUser";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {LayoutDashboard} from "lucide-react";
import {Heading} from "@radix-ui/themes";
import {LoadingComponent} from "@/components/common/loading-component";
import {useEffect, useState} from "react";
import {useCartStore} from "@/hooks/stores/useCartStore";
import {ICartItemsStoreState} from "@/lib/interfaces/zustand-store-states";
// TODO: Add loading page before going to logout page

export default function LogoutPage() {
    const { clearCart } = useCartStore();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [lastPath, setLastPath] = useState("/");
    const {executeAsync} = useAction(logoutUserAction);
    const { handleSignout } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        const storedPath = sessionStorage.getItem('lastPath');
        if (storedPath) {
            setLastPath(storedPath);
        }
    }, []);


    const handleLogout = () => {
        setIsRedirecting(true);
        executeAsync()
            .then((result) => {
                if (result) {
                    handleSignout();
                    clearCart();
                }
            })
            .finally(() => {
                router.push("/auth/login");
            });
    }

    const redirectBack = () => {
        // Use the stored path, or fallback to login page if not available
        router.push(lastPath || "/auth/login");
    }


    return (
        <>
            {isRedirecting ? <LoadingComponent message="Logging out"/> : (
                <Card className="p-3">
                    <CardHeader className="items-center justify-center">
                        {/*TODO: Replace with logo*/}
                        <LayoutDashboard className="fill-current w-12 h-12 text-[hsl(var(--primary))]"/>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Heading
                            trim="both"
                            as="h1"
                            size="4"
                            weight="medium"
                        >
                            Log out of Pahiram?
                        </Heading>

                        <p className="text-sm">You can always log back in at any time.</p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button className="w-full" onClick={
                            handleLogout}>
                            Logout
                        </Button>
                        <Button variant="outline" className="w-full" onClick={redirectBack}>
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            )}

        </>
    )
}