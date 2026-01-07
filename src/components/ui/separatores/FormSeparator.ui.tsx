interface DividerWithTextProps {
  text: string;
}

function DividerWithText({ text }: DividerWithTextProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">{text}</span>
      </div>
    </div>
  );
}

interface HelperTextProps {
  text?: string;
  children?: React.ReactNode
}

function HelperText({ text, children }: HelperTextProps) {
  return <p className="text-xs text-gray-500 mt-1">{text}{children}</p>;
}


export { DividerWithText, HelperText }
