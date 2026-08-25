// Single source of truth for the site's public address and identity.
// Currently the live GitHub Pages project URL. When a custom domain is bought
// and pointed at the site, change SITE_URL here (no trailing slash) and update
// public/sitemap.xml, public/robots.txt and index.html to match. Every
// canonical URL, social share tag and structured-data reference reads from this.
export const SITE_URL = "https://gnneves6.github.io/guilherme-neves-digital";

// The person is the brand. There is no separate company name to carry, and
// inventing one made a one-man practice sound like an agency.
export const SITE_NAME = "Guilherme Neves";
export const SITE_BRAND = "Guilherme Neves";

// Open Graph / social share image, served from /public (see public/og-image.jpg).
export const OG_IMAGE_PATH = "/og-image.jpg";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
