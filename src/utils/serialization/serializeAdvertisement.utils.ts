import { adversetimentCreateDTO } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";

export function serializeAdvertisement(formData: adversetimentCreateDTO) {
  const fd = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (key === "options" || key === "address") {
      Object.entries(value as any).forEach(([subKey, subValue]) => {
        if (typeof subValue === "object" && subValue !== null) {
          Object.entries(subValue).forEach(([k, v]) => {
            fd.append(`${key}.${subKey}.${k}`, v.toString());
          });
        } else {
          fd.append(`${key}.${subKey}`, String(subValue));
        }
      });
      return;
    }

    if (key === "imagesFiles") {
      (value as File[]).forEach((file) => fd.append("imagesFiles", file));
      return;
    }

    fd.append(key, value.toString());
  });

  return fd;
}

