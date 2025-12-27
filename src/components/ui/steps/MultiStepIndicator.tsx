interface MultiStepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function MultiStepIndicator({ totalSteps, currentStep }: MultiStepIndicatorProps) {
  return (
    <div className="w-full px-2 sm:px-4">
      <div className="hidden sm:flex justify-center items-center gap-1 md:gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-300 ${index <= currentStep
                ? "bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg scale-110"
                : "bg-gray-200 text-gray-400"
                }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-2 md:w-3 mx-1 md:mx-2 rounded-full transition-all duration-300 ${index < currentStep
                  ? "bg-linear-to-r from-blue-600 to-indigo-600"
                  : "bg-gray-200"
                  }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="sm:hidden">
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="absolute top-0 left-0 h-full bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-center px-1">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${index <= currentStep
                ? "bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-md"
                : index === currentStep + 1
                  ? "bg-blue-100 text-blue-600 ring-2 ring-blue-200"
                  : "bg-gray-200 text-gray-400"
                }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 font-medium">
        Passo <span className="text-blue-600 font-bold">{currentStep + 1}</span> de {totalSteps}
      </p>
    </div>
  );
}
