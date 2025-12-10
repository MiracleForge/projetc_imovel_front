import Link from "next/link";

export default function TopPromotion() {
  return (
    <aside className="w-full bg-linear-to-r from-white to-secundary-blue text-center text-xs md:text-sm py-2 px-3 text-black font-light">
      <span className="font-semibold text-black">
        Lançamento exclusivo:
      </span>{" "}
      publique seus anúncios gratuitamente até 7 de janeiro.
      <Link
        href="/register"
        className="
          inline-flex items-center ml-2
          font-semibold text-xs md:text-sm
          bg-white/20 hover:bg-white/40
          text-white px-3 py-1 rounded-full
          transition-all
        "
      >
        Começar
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M17 8l4 4m-4 4l4-4H3" />
        </svg>
      </Link>
    </aside>
  );
}

