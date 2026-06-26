/** Trust Center navigation — single source for footer and cross-links. */
export const TRUST_LINKS = [
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
  { href: "/personal-data", key: "personalData" },
  { href: "/cookies", key: "cookies" },
  { href: "/contact", key: "contact" },
  { href: "/status", key: "status" },
  { href: "/roadmap", key: "roadmap" },
  { href: "/changelog", key: "changelog" },
] as const;

export type TrustLinkKey = (typeof TRUST_LINKS)[number]["key"];
