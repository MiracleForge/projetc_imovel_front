interface LoadingSpinnerProps {
  text: string;
}

export default function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        <span className="text-sm text-secundary-blue">{text}</span>
      </div>
    </div>
  )
}
