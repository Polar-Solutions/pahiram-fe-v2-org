import {ContentLayout} from "@/components/panel/containers/content-layout";
import PenaltyContainer from "@/components/penalties/containers/penalties-container";
import Content from "@/components/common/content";
import TransactionTabsHeader from "@/components/transaction/presentational/transaction-tabs-header";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";

export default function Page() {
    return (
        <ContentLayout title="FAO Manage Penalties">
                <DynamicBreadcrumbsComponent
                    activePage="Manage Penalties"
                />
            <Content>
                <PenaltyContainer />
            </Content>
        </ContentLayout>
    )
}