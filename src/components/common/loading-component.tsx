import {LoadingSpinner} from "@/components/icons";

interface ILoadingComponentProps {
    message?: string;
}

export const LoadingComponent = ({message}: ILoadingComponentProps) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
                <LoadingSpinner size={32} strokeColor="hsl(var(--primary))"/>
                <p>{message}</p>
            </div>
        </div>
    )
}