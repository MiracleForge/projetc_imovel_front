'use client'
import { advertisementPage } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";
import dynamic from "next/dynamic";
import { useState } from "react";

const GoogleMapsIframe = dynamic(() => import("./GoogleMapsIframe.layout"), {
  ssr: false,
});

interface GoogleMapsProps {
  adress: advertisementPage["address"];
  zoom: number;
}

const GoogleMapsComponent = ({ adress, zoom }: GoogleMapsProps): React.JSX.Element => {
  const [isMapOpen, setMapOpen] = useState<boolean>(false);

  return (
    <section className="w-full bg-white rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md">

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-6">

        <div className="flex flex-col">
          <h2 className="text-base font-semibold text-neutral">
            Informação do Endereço
          </h2>

          <address
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
            className="not-italic text-sm text-neutral-terciary mt-1 flex flex-wrap items-center gap-2"
          >
            <span itemProp="addressRegion">{adress.state}</span>

            <span aria-hidden="true">•</span>

            <span itemProp="addressLocality">{adress.city}</span>

            <span aria-hidden="true">•</span>

            <span itemProp="addressNeighborhood">{adress.neighbourhood}</span>

            <span aria-hidden="true">•</span>

            <span itemProp="streetAddress">{adress.street}</span>

            <span aria-hidden="true">•</span>

            <span itemProp="postalCode">{adress.cep}</span>
          </address>
        </div>

        <button
          onClick={() => setMapOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
          text-secundary-blue border border-secundary-blue/20 rounded-lg
          hover:bg-secundary-blue hover:text-white transition-colors"
        >
          📍
          <span>
            {isMapOpen ? "Fechar mapa" : "Ver localização no mapa"}
          </span>
        </button>
      </header>

      {isMapOpen && (
        <div className="px-4 pb-4 md:px-6 md:pb-6">
          <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden border border-gray-200">
            <GoogleMapsIframe adress={adress} zoom={zoom} />
          </div>
        </div>
      )}
    </section>
  );
};


export default GoogleMapsComponent;

