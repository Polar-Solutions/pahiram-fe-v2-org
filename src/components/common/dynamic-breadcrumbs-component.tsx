import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { random } from "node_modules/cypress/types/lodash";

interface IProps {
  activePage: string;
  items?: string[];
}

export default function DynamicBreadcrumbsComponent({
  activePage,
  items,
}: IProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items?.map((item) => (
          <React.Fragment key={item}>
            {/* Use a unique combination for key */}
            <BreadcrumbItem>
              <BreadcrumbLink>{item}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem key={activePage}>
          <BreadcrumbPage>{activePage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
