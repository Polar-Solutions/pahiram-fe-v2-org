import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import React from "react";

interface IContentProps {
  children?: React.ReactNode;
}

export default function Content({ children }: IContentProps) {
  // Separating the first child from the rest
  const childArray = React.Children.toArray(children);
  const [firstChild, ...footerChildren] = childArray;

  const footerHeight = footerChildren.length > 0 ? 60 : 0;

  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent
        className={`px-8 py-8 ${footerChildren.length > 0 ? "pb-0" : ""}`}
      >
        <div
          className="w-full flex flex-col md:flex-row gap-8 grid-cols-1"
          style={{
            minHeight: `calc(100vh - 56px - 64px - 20px - 24px - 56px - 48px - ${footerHeight}px)`, // subtract footer height if it exists
          }}
        >
          {firstChild}
        </div>
      </CardContent>

      {/* Render the second child separately */}
      {footerChildren.length > 0 && (
        <CardFooter className="mt-auto pt-4">{footerChildren}</CardFooter>
      )}
    </Card>
  );
}
