interface GalleryImageButtonProps {
  onOpen: () => void
  ariaLabel: string
  children: React.ReactNode
  isOpen: boolean
  className?: string
}

export function GalleryImageButton({
  onOpen,
  ariaLabel,
  children,
  isOpen,
  className
}: GalleryImageButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className={`block w-full h-fullfocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secundary-blue cursor-pointer ${className ?? ""}`}
    >
      {children}
    </button>
  )
}
