import { ContentLayout } from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import ApproverSpecificReqTrans from "@/components/transaction/presentational/approve-transaction-specific";

export default function Page() {

  return (
    <ContentLayout title="Specific Transaction">
      <DynamicBreadcrumbsComponent
        activePage="Specific Transaction"
      />
        <Content>
            <ApproverSpecificReqTrans />
        </Content>
    </ContentLayout>
  );
}
