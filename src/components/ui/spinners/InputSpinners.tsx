export function InputSpinner({ text = "Carregando..." }) {
  return (
    <div className="flex items-center gap-2 text-sm text-secundary-blue">
      <div className="animate-spin h-4 w-4 border-2 border-secundary-blue border-t-transparent rounded-full" />
      {text}
    </div>
  );
}

