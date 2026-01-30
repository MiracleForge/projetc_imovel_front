import { advertisementPage } from "@/src/contracts/DTOs/advertisement/views/advertisement.card.dto";

const GoogleMapsIframe = ({
  adress,
  zoom,
}: {
  adress: advertisementPage["address"];
  zoom: number;
}): React.JSX.Element => {
  const fullAddress = encodeURIComponent(
    `${adress.street}, ${adress.neighbourhood}, ${adress.city}, ${adress.state}, ${adress.cep}, Brasil`
  );
  return (
    <iframe
      width="100%"
      height="100%"
      style={{ borderRadius: 10 }}
      title="Mapa da localização"
      src={`https://maps.google.com/maps?width=100%&height=600&hl=pt-br&q=${fullAddress}&ie=UTF8&t=&z=${zoom}&iwloc=B&output=embed`}
      itemProp="map"
    ></iframe>
  );
};

export default GoogleMapsIframe;

