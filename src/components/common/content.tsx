import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

interface IContentProps {
    children?: React.ReactNode;
}

export default function Content({ children }: IContentProps) {
    // Check if the last child is a footer
    const childArray = React.Children.toArray(children);
    const lastChild = childArray[childArray.length - 1];
    const hasFooter = React.isValidElement(lastChild) && lastChild.type === 'footer';

    // Separate content and footer
    const contentChildren = hasFooter ? childArray.slice(0, -1) : childArray;
    const footerChild = hasFooter ? lastChild : null;

    return (
        <Card className="rounded-lg border-none mt-6">
            <CardContent className="px-8 py-8">
                <div className="w-full" style={{ minHeight: hasFooter ? 'calc(100vh - 300px)' : 'auto' }}>
                    {contentChildren}
                </div>
            </CardContent>

            {footerChild && (
                <CardFooter className="mt-auto pt-4">{footerChild}</CardFooter>
            )}
        </Card>
    );
}