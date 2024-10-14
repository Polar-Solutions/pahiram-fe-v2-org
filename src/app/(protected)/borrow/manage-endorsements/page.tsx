import {ContentLayout} from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import ApproverTransactionContainer from "@/components/approver/containers/approver-transaction-container";
import ApproverHeader from "@/components/approver/presentational/approver-header";

export default function Page() {
    return (
        <ContentLayout title="Manage Endorsement">
            <ApproverHeader/>
            <Content>
                <ApproverTransactionContainer/>
            </Content>
        </ContentLayout>
    )
}