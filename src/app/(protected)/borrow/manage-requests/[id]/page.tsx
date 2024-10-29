import { ContentLayout } from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import RequetsHeader from "@/components/request/presentational/request-header";
import SpecificTransaction from "@/components/request/presentational/specific-transaction";

export default function Page({params}: { params: { id: string } }) {

    return (
        <ContentLayout title="Specific Transaction">
            <RequetsHeader id={params.id} />
            <Content>
                <SpecificTransaction />
            </Content>
        </ContentLayout>
    );
}