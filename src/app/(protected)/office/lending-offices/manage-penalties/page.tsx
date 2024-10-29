import {ContentLayout} from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import TransactionContainer from "../../../../../components/penalties/containers/penalized-transaction-container";
import DynamicBreadcrumbsComponent from "../../../../../components/common/dynamic-breadcrumbs-component";

export default function Page() {
    return (
        <ContentLayout title="Manage Penalties">
            <DynamicBreadcrumbsComponent
                activePage="Manage Penalties"
            />
            <Content>
                <TransactionContainer/>
            </Content>
        </ContentLayout>
    )
}