import UrlReferencyButton from "../../ui/buttons/UrlRefency.buttons"
import ToHomeButton from "../../ui/buttons/ToHomeButton.ui"

export const CompactHeader = () => {
  return (
    <header className="flex flex-row justify-between p-6 z-9999 relative">
      <ToHomeButton />
      <UrlReferencyButton />
    </header>
  )
}

