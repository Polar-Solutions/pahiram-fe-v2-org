import NextTopLoader from "nextjs-toploader";

export default function NoPanelLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {children}
            </div>
        </>
    );
}
