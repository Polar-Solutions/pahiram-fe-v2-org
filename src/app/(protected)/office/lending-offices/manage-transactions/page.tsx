import {ContentLayout} from "@/components/panel/containers/content-layout";
import TransactionHeader from "@/components/transaction/presentational/transaction-header";
import TransactionContainer from "@/components/transaction/containers/transaction-container";
import Content from "@/components/common/content";

export default function Page() {
    return (
        <ContentLayout title="Manage Transaction">
            <TransactionHeader/>
            <Content>
                <TransactionContainer />
            </Content>
        </ContentLayout>
    )
}