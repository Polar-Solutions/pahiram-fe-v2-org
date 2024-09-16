import {ContentLayout} from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import RequestContainer from "@/components/request/containers/item-container";
import RequetsHeader from "@/components/request/presentational/request-header";

export default function Page() {

    return (
        <ContentLayout title="Manage Requests">
            <RequetsHeader/>
            <Content>
                <RequestContainer />
            </Content>
        </ContentLayout>
    )
}