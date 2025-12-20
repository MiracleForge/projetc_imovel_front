import { Advertiser, listingEntity } from "./domain.types";

export type ItemInscriptionPanel = {
  spaceId: string;
  advertiser: Advertiser;
  hasNewPublication: boolean;
};

export type PartialOptions = Partial<listingEntity["options"]>;

export type HomeCardsType = Omit<listingEntity, "updatedAt" | "options"> & {
  options?: PartialOptions;
};


