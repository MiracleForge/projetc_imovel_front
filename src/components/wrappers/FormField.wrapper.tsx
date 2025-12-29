export default function FormField({
  label,
  children,
  srOnly,
}: {
  label: string;
  srOnly?: boolean;
  children: React.ReactNode;
}) {
  return <fieldset role="group" className="flex flex-col gap-3 space-y-1 mt-2">
    <legend className={srOnly ? "sr-only" : "text-lg mx-auto font-semibold text-gray-800 tracking-tight"}>
      {label}
    </legend>
    {children}
  </fieldset>

}

