import { Advertiser } from "@/src/contracts/types/cards/domain.types";
import { adversetimentEntityDTO } from "../advertisement.entity.dto";


export type advertisementCardOptions = {
  propertyMetrics: Partial<
    Pick<
      adversetimentEntityDTO["options"]["propertyMetrics"],
      "rooms" | "bathrooms" | "garage" | "area"
    >
  >;
};


export type homeCardAdvertisement =

  Omit<
    adversetimentEntityDTO,
    | "description"
    | "phone"
    | "whatsapp"
    | "updatedAt"
    | "address"
    | "options"
  > & {
    advertiser: Pick<Advertiser, "name" | "image" | "role">,

    address: Pick<
      adversetimentEntityDTO["address"],
      "state" | "city" | "neighbourhood"
    >;

    options: advertisementCardOptions;

    slugUrl: string;
  };

