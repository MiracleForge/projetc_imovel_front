interface MultiStepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function MultiStepIndicator({ totalSteps, currentStep }: MultiStepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${index <= currentStep
                  ? "bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg scale-110"
                  : "bg-gray-200 text-gray-400"
                }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${index < currentStep
                    ? "bg-linear-to-r from-blue-600 to-indigo-600"
                    : "bg-gray-200"
                  }`}
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 mt-3">
        Passo {currentStep + 1} de {totalSteps}
      </p>
    </div>
  );
}     
