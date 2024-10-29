import {ContentLayout} from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import PenalizedTransactionSpecific from "@/components/penalties/presentational/penalized-transaction-specific";

export default function Page({params}: { params: { id: string } }) {

    return (
        <ContentLayout title="Specific Transaction">
            <DynamicBreadcrumbsComponent
                activePage={params.id}
                items={[{
                    name: "Manage Penalties",
                    url: "/office/lending-offices/manage-penalties",
                }
                ]}
            />
            <Content>
                <PenalizedTransactionSpecific transactionId={params.id}/>
            </Content>
        </ContentLayout>
    );
}
