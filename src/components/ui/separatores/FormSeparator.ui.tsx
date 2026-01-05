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
  text: string;
}

function HelperText({ text }: HelperTextProps) {
  return <p className="text-xs text-gray-500 mt-1">{text}</p>;
}


export { DividerWithText, HelperText }
