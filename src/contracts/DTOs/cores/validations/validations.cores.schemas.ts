import { z } from "zod";

export const toNumber = z.preprocess(
  (val) => {
    if (val === "" || val === undefined || val === null) return undefined;
    if (typeof val === "string") return Number(val);
    return val;
  },
  z.number()
);

