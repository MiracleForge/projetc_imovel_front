import { userEntityDTO } from "../../user/user.entity.dto";
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
    | "slugUrl"
    | "transactionMode"
    | "subTitle"
    | "phone"
    | "whatsapp"
    | "updatedAt"
    | "address"
    | "options"
    | "images"
    | "imagesFiles"
  > & {
    advertiser: Pick<userEntityDTO, "name" | "image">;

    address: Pick<
      adversetimentEntityDTO["address"],
      "state" | "city" | "neighbourhood"
    >;

    options: advertisementCardOptions;
    image: string;
  };

export type advertisementPage = Omit<adversetimentEntityDTO, "imagesFiles"> & {
  images: string[];
  advertiser: Pick<userEntityDTO, "name" | "image">;
}
