import {ContentLayout} from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import ApproverHeader from "@/components/approver/presentational/approver-header";
import ApproverSpecificReqTrans
    from "@/components/approver/presentational/approver-specific-req-trans";

export default function Page({params}: { params: { id: string } }) {

    return (
        <ContentLayout title="Specific Transaction">
            <ApproverHeader/>
            <Content>
                <ApproverSpecificReqTrans transacId={params.id}/>
            </Content>
        </ContentLayout>
    );
}
