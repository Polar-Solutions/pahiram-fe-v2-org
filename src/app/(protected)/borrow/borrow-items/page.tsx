import { ContentLayout } from "@/components/panel/containers/content-layout";
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
                {/* If you need a footer, uncomment and add content
                <footer>
                    <div className="flex justify-end">
                        <Button>Some Action</Button>
                    </div>
                </footer>
                */}
            </Content>
        </ContentLayout>
    )
}