import {ContentLayout} from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import ManagePenalties from "@/components/penalty/container/manage-penalties-container";

export default function Page() {
    return (
        <ContentLayout title="Manage Penalty">
            <Content>
                <ManagePenalties/>
            </Content>
        </ContentLayout>
    )
}