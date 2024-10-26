"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {useRouter} from 'nextjs-toploader/app';
interface IBreadcrumbItem {
    name: string;
    url: string;
}

interface IProps {
    activePage: string;
    items?: IBreadcrumbItem[];
}

export default function DynamicBreadcrumbsComponent({
                                                        activePage,
                                                        items,
                                                    }: IProps) {

    const router = useRouter();
    const handleBreadcrumbClick = (url: string) => {
        router.replace(url);
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items?.map((item) => (
                    <React.Fragment key={item.name}>
                        {/* Use a unique combination for key */}
                        <BreadcrumbItem>
                            <BreadcrumbLink className="cursor-pointer" onClick={() => handleBreadcrumbClick(item.url)}>{item.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                    </React.Fragment>
                ))}
                <BreadcrumbItem key={activePage}>
                    <BreadcrumbPage>{activePage}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
