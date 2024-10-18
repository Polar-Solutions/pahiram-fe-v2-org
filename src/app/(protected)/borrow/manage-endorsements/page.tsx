import {ContentLayout} from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import EndorsementContainer from "@/components/endorsement/containers/endorsement-container";
import TransactionTabsHeader from "@/components/transaction/presentational/transaction-tabs-header";

export default function Page() {
    return (
        <ContentLayout title="Manage Endorsement">
            <TransactionTabsHeader/>
            <Content>
                <EndorsementContainer/>
            </Content>
        </ContentLayout>
    )
}