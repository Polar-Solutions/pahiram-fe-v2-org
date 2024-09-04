import {ContentLayout} from "@/components/panel/containers/content-layout";
import Content from "@/components/common/content";
import ItemsContainer from "@/components/borrow/containers/items-container";
import DynamicBreadcrumbsComponent from '@/components/common/dynamic-breadcrumbs-component';


export default function Page() {
    return (
        <ContentLayout title="Borrow Items">
            <DynamicBreadcrumbsComponent
                activePage="Explore Items"
            />
            <Content>
                <ItemsContainer />
            </Content>
        </ContentLayout>
    )
}