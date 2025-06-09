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

// You can add more queries here as needed
// export const ABOUT_QUERY = groq`*[_type == "about"][0] { ... }`;
