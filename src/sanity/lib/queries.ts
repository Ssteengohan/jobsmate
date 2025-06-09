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

// Tabs Section Query
export const TABS_SECTION_QUERY = groq`*[_type == "tabsSection"][0] {
  _id,
  title,
  tabs[] | order(order asc) {
    title,
    value,
    icon,
    componentType,
    order
  }
}`;

// Combined query with tabs included
export const HOME_PAGE_WITH_TABS_QUERY = groq`{
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
  },
  "tabsSection": *[_type == "tabsSection"][0] {
    _id,
    title,
    tabs[] | order(order asc) {
      title,
      value,
      icon,
      componentType,
      order
    }
  }
}`;

// Slider Section Query
export const SLIDER_SECTION_QUERY = groq`*[_type == "sliderSection"][0] {
  _id,
  title,
  headingText,
  headingPrefix,
  highlightText,
  logos[] | order(order asc) {
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    alt,
    companyName,
    order,
    isVisible
  },
  animationSettings {
    enableAnimations,
    animationDuration,
    enableTiltEffect
  },
  backgroundSettings {
    showBackground,
    backgroundOpacity
  },
  isEnabled
}`;

// Updated combined query with all sections
export const FULL_HOME_PAGE_QUERY = groq`{
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
  },
  "tabsSection": *[_type == "tabsSection"][0] {
    _id,
    title,
    tabs[] | order(order asc) {
      title,
      value,
      icon,
      componentType,
      order
    }
  },
  "sliderSection": *[_type == "sliderSection"][0] {
    _id,
    title,
    headingText,
    headingPrefix,
    highlightText,
    logos[] | order(order asc) {
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      alt,
      companyName,
      order,
      isVisible
    },
    animationSettings {
      enableAnimations,
      animationDuration,
      enableTiltEffect
    },
    backgroundSettings {
      showBackground,
      backgroundOpacity
    },
    isEnabled
  }
}`;

// You can add more queries here as needed
// export const ABOUT_QUERY = groq`*[_type == "about"][0] { ... }`;
