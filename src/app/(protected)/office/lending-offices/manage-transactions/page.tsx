import {ContentLayout} from "@/components/panel/containers/content-layout";
import TransactionContainer from "@/components/transaction/containers/transaction-container";
import Content from "@/components/common/content";
import TransactionTabsHeader from "@/components/transaction/presentational/transaction-tabs-header";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
export default function Page() {
    return (
        <ContentLayout title="Manage Transaction">
                <DynamicBreadcrumbsComponent
                    activePage="Manage Transactions"
                />
            <Content>
                <TransactionContainer />
            </Content>
        </ContentLayout>
    )
}