export type CopyrightLicenseKey =
  | "cc_by_nc_sa"
  | "cc_by"
  | "cc_by_nc"
  | "cc_by_nd"
  | "cc_by_sa"
  | "cc0"
  | "all_rights_reserved";

const LICENSES: Record<
  CopyrightLicenseKey,
  { label: string; url?: string }
> = {
  cc_by_nc_sa: {
    label: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0",
  },
  cc_by: {
    label: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0",
  },
  cc_by_nc: {
    label: "CC BY-NC 4.0",
    url: "https://creativecommons.org/licenses/by-nc/4.0",
  },
  cc_by_nd: {
    label: "CC BY-ND 4.0",
    url: "https://creativecommons.org/licenses/by-nd/4.0",
  },
  cc_by_sa: {
    label: "CC BY-SA 4.0",
    url: "https://creativecommons.org/licenses/by-sa/4.0",
  },
  cc0: {
    label: "CC0 1.0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  all_rights_reserved: {
    label: "All Rights Reserved",
  },
};

export function resolveCopyrightLicense(
  raw?: string,
): (typeof LICENSES)[CopyrightLicenseKey] | null {
  if (!raw) return null;
  const key = raw as CopyrightLicenseKey;
  return LICENSES[key] ?? null;
}
