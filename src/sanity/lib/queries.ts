import { groq } from "next-sanity";

// Navbar query
export const NAVBAR_QUERY = groq`*[_type == "navbar"][0] {
  _id,
  logo {
    asset->{
      _id,
      url
    },
    alt
  },
  logoText,
  navigationItems[] {
    title,
    href,
    isExternal
  },
  ctaButtons[] {
    text,
    href,
    variant,
    ariaLabel
  }
}`;

// Hero Banner query
export const HERO_BANNER_QUERY = groq`*[_type == "heroBanner"][0] {
  _id,
  title,
  subtitle,
  ctaButtons[] {
    text,
    href,
    variant,
    ariaLabel,
    isExternal
  },
  backgroundImage {
    asset->{
      _id,
      url
    },
    alt
  },
  showGradientOverlay
}`;

// You can add more queries here as needed
// export const ABOUT_QUERY = groq`*[_type == "about"][0] { ... }`;
