import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import React from "react";
import {LucideFilter, Search} from "lucide-react";

export default function MobileFilterAndSearchComponent() {
    // TODO: Complete this
    return (
        <div className="flex justify-between mb-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="items-center justify-center" variant="outline">
                        <LucideFilter className="h-4 w-4 text-muted-foreground mr-2"/>
                        Show Filters
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3"/>
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            <Button className="p-0 h-10 w-10 items-center justify-center rounded-full" variant="outline">
                <Search className="h-4 w-4 text-muted-foreground"/>
            </Button>
        </div>
    )
}