"use client";

import * as React from "react";
import {useEffect, useState} from "react";
import {ChevronsUpDown} from "lucide-react";

import {useMediaQuery} from "@/hooks/useMediaQuery";
import {Button} from "@/components/ui/button";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {filterViewsList, findViewsListElement, VIEWS_LIST,} from "@/CONSTANTS/VIEWS_LIST";
import {useRouter} from 'nextjs-toploader/app';
import useBaseUrlPath from "@/hooks/useBaseUrlPath";
import {getUserFromAuthCookie} from "@/core/data-access/cookies";

export function SelectView() {
    const [userData, setUserData] = useState<any>(null);

    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [selectedView, setSelectedView] = useState<string>("");

    const router = useRouter();

    const currentUrlView = useBaseUrlPath();

    const viewObject = findViewsListElement(currentUrlView);

    const handleSelect = (view: string) => {
        const selectedView = VIEWS_LIST[view as keyof typeof VIEWS_LIST];
        if (selectedView) {
            setSelectedView(view);
            router.replace(selectedView.href);
        } else {
            console.error(`View ${view} not found in VIEWS_LIST`);
        }
        setOpen(false);
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
    };

    useEffect(() => {
        async function fetchUserData() {
            const user = await getUserFromAuthCookie();
            setUserData(user);
        }

        fetchUserData();
    }, []);
    const filteredViews = filterViewsList(userData);

    const renderViewList = () => {
        return (
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Views</SelectLabel>
                        {filteredViews.map((view: any) => (
                            <SelectItem
                                key={view.label}
                                value={view.label}
                                onSelect={() => handleSelect(view.label)}
                            >
                                {view.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
        );
    };

    if (isDesktop) {
        return (
            <Select
                value={selectedView || viewObject?.label}
                onValueChange={(value) => handleSelect(value)}
            >
                <SelectTrigger
                    onClick={() => handleOpenChange(true)}
                    className="w-[180px]"
                >
                    <SelectValue/>
                </SelectTrigger>
                {renderViewList()}
            </Select>
        );
    }

    return (
        <Drawer open={open} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-between">
                    {selectedView ? selectedView : viewObject?.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t p-4">
                    {filteredViews.map((view: any) => (
                        <Button
                            key={view.label}
                            variant="ghost"
                            className="w-full text-left text-lg"
                            onClick={() => handleSelect(view.label)}
                        >
                            {view.label}
                        </Button>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
