import ItemsContainer from "@/components/borrow/containers/items-container";
import { SubmitBorrowRequestContainer } from "@/components/borrow/containers/submit-borrow-request/submit-borrow-request-container";
import Content from "@/components/common/content";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import { ContentLayout } from "@/components/panel/containers/content-layout";
import React from "react";

function page() {
  return (
    <ContentLayout title="Borrow Items">
      <DynamicBreadcrumbsComponent activePage="Submit Borrowing Request" items={["Explore Items"]} />
      <Content>
        <SubmitBorrowRequestContainer />
      </Content>
    </ContentLayout>
  );
}

export default page;
