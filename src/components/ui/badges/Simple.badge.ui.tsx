export default function SimpleBadge({ text }: { text: string }) {
  return (
    <div className="absolute top-4 right-4">
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-secundary-blue text-xs font-bold">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
        </svg>
        {text}
      </span>
    </div>
  )
}
