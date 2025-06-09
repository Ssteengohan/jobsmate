import { groq } from "next-sanity";

// Combined query for optimal performance - fetch both navbar and hero banner in one request
export const HOME_PAGE_QUERY = groq`{
  "navbar": *[_type == "navbar"][0] {
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
  },
  "heroBanner": *[_type == "heroBanner"][0] {
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
  }
}`;

// Individual queries for flexibility
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
