import { ContentLayout } from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs-component";
import PenaltiesSpecific from "@/components/penalties/presentational/penalties-specific";

export default function Page({params}: { params: { id: string } }) {

  return (
    <ContentLayout title="Specific Transaction">
            <DynamicBreadcrumbsComponent
                activePage={params.id}
                items={[{
                    name: "Manage Transaction",
                    url: "/borrow/manage-transactions",
                }
                ]}
            />
        <Content>
            <PenaltiesSpecific />
        </Content>
    </ContentLayout>
  );
}
