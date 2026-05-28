// SAMPLE affiliates.ts — replace with your real data
// The real production file contains 900+ affiliate entries
// This is a 3-entry sample showing the structure

export interface AffiliateConfig {
  id: string;
  slug: string;
  name: string;
  bio: string;
  link: string;
  subdomain: string;
  photo: string;
  lang?: string;
  theme?: string;
  social_link?: string;
}

export const affiliates: AffiliateConfig[] = [
  {
    id: "sample1",
    slug: "sample1",
    name: "Sample Affiliate 1",
    bio: "",
    link: "https://YOUR-SMARTLINK-URL/?sub1=sample1",
    subdomain: "sample1",
    photo: "https://i.ibb.co/PLACEHOLDER/sample1.jpg",
    lang: "FR",
    theme: "tower-rush"
  },
  {
    id: "sample2",
    slug: "sample2",
    name: "Sample Affiliate 2 (chicken theme)",
    bio: "",
    link: "https://YOUR-SMARTLINK-URL/?sub1=sample2",
    subdomain: "sample2",
    photo: "https://i.ibb.co/PLACEHOLDER/sample2.jpg",
    lang: "FR",
    theme: "chicken"
  },
  {
    id: "sample3",
    slug: "sample3",
    name: "Sample Affiliate 3 (penalty)",
    bio: "",
    link: "https://YOUR-SMARTLINK-URL/?sub1=sample3",
    subdomain: "sample3",
    photo: "",
    lang: "FR",
    theme: "penalty"
  },
  // Ajoutez vos autres affiliés ici
];

export function getCurrentAffiliate(): AffiliateConfig | null {
  if (typeof window === 'undefined') return null;
  const host = window.location.hostname.toLowerCase();
  const subdomain = host.split('.')[0];
  return affiliates.find(a => a.subdomain.toLowerCase() === subdomain) || null;
}
