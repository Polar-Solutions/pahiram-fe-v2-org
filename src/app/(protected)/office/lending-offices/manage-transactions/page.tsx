import {ContentLayout} from "@/components/panel/containers/content-layout";
import TransactionHeader from "@/components/transaction/presentational/transaction-header";
import TransactionContainer from "@/components/transaction/containers/transaction-container";
import Content from "@/components/common/content";
import TransactionTabsHeader from "@/components/transaction/presentational/transaction-tabs-header";

export default function Page() {
    return (
        <ContentLayout title="Manage Transaction">
            <TransactionTabsHeader/>
            <Content>
                <TransactionContainer />
            </Content>
        </ContentLayout>
    )
}