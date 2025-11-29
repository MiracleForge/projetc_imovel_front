import ToHomeButton from "@/src/components/ui/buttons/ToHomeButton.ui";
import Image from "next/image";

export default function SlideMenu({ toggleId }: { toggleId: string }) {
  return (
    <nav className="
        fixed top-0 right-0 h-screen
        w-screen max-w-sm
        p-4
        transform translate-x-full opacity-0
        peer-checked:translate-x-0 peer-checked:opacity-100
        transition-transform duration-300 ease-in-out
        z-50
        shadow bg-red-600
      ">
      <div className="inline-flex items-center w-full justify-between">
        <ToHomeButton />

        <label htmlFor={toggleId} className="cursor-pointer" role="button">
          <Image
            src="/miscellaneous/close-icon.svg"
            width={24}
            height={24}
            alt="Fechar menu"
          />
        </label>
      </div>
    </nav>
  );
}

