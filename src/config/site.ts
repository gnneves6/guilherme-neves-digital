// Single source of truth for the site's public address and identity.
// Change SITE_URL here (no trailing slash) when the final domain is live —
// every canonical URL, social share tag and structured-data reference reads
// from this one constant.
export const SITE_URL = "https://guilhermeneves.com";

export const SITE_NAME = "Guilherme Neves";
export const SITE_BRAND = "GN Performance Systems";

// Open Graph / social share image, served from /public (see public/og-image.jpg).
export const OG_IMAGE_PATH = "/og-image.jpg";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
