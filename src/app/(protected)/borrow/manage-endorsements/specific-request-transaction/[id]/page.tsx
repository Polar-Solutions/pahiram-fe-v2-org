import {ContentLayout} from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import EndorsementTransactionSpecific from "@/components/endorsement/containers/endorsement-transaction-specific";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import React from "react";

export default function Page({params}: { params: { id: string } }) {

    return (
        <ContentLayout title="Specific Transaction">
            <DynamicBreadcrumbsComponent
                activePage={params.id}
                items={[{
                    name: "Manage Endorsements",
                    url: "/borrow/manage-endorsements",
                }
                ]}
            />
            <Content>
                <EndorsementTransactionSpecific transactionId={params.id}/>
            </Content>
        </ContentLayout>
    );
}
