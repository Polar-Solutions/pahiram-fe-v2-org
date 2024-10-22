import { ContentLayout } from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import ApproverSpecificReqTrans from "@/components/transaction/presentational/approver-transaction-specific";

export default function Page({params}: { params: { id: string } }) {

  return (
    <ContentLayout title="Specific Transaction">
            <DynamicBreadcrumbsComponent
                activePage={params.id}
                items={[{
                    name: "Manage Transaction",
                    url: "/borrow/manage-transactions",
                }
                ]}
            />
        <Content>
            <ApproverSpecificReqTrans transactionId={params.id} />
        </Content>
    </ContentLayout>
  );
}
