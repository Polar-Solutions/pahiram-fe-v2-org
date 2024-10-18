import { ContentLayout } from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import RequetsHeader from "@/components/request/presentational/request-header";
import ApproverSpecificReqTrans from "@/components/transaction/presentational/approver-transaction-specific";

export default function Page() {

  return (
    <ContentLayout title="Specific Transaction">
      <RequetsHeader />
        <Content>
            <ApproverSpecificReqTrans />
        </Content>
    </ContentLayout>
  );
}
