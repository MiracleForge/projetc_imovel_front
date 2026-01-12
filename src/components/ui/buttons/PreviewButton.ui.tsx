"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Activity } from "react";

const AdvertisementPreviewPanel = dynamic(
  () =>
    import("../../layouts/Previews/AdvertisementPreviewPanel.layout"),
  {
    ssr: false,
  }
);

export default function PreviewButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-[9.3rem] right-0 flex items-center space-x-3 bg-primary-blue text-white font-semibold z-50 p-3 drop-shadow-md drop-shadow-black/30 rounded-l-2xl rounded-b-none hover:bg-secundary-blue hover:ring-2 ring-terciary-blue transition-all hover:scale-105"
      >
        <img
          src="/miscellaneous/preview-icon.svg"
          className="w-6 h-6"
          alt=""
        />
        <span>Pré visualizar anúncio</span>
      </button>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <AdvertisementPreviewPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Activity>
    </>
  );
}

