export const StepProgressIndicator = ({ currentStep, steps }: { currentStep: number, steps: string[] }) => (
    <div className="flex items-center w-full mt-6 mb-2">
        {steps.map((step, index) => (
            <div key={step} className="flex-1 relative">
                <div className={`h-1 ${
                    index < currentStep ? "bg-green-500" :
                        index === currentStep ? "bg-blue-500" : "bg-gray-300"
                }`} />
                <div className={`absolute top-0 -ml-1 w-3 h-3 rounded-full ${
                    index < currentStep ? "bg-green-500" :
                        index === currentStep ? "bg-blue-500" : "bg-gray-300"
                }`} style={{left: index === 0 ? '0%' : index === steps.length - 1 ? '100%' : '50%'}} />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-center w-20">
                    {step}
                </div>
            </div>
        ))}
    </div>
)