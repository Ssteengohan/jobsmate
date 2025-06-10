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
  },
  "timeline": *[_type == "timeline" && isActive == true][0] {
    _id,
    title,
    subtitle,
    items[] | order(order asc) {
      title,
      description,
      emoji,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      video {
        asset->{
          _id,
          url
        },
        alt
      },
      videoUrl,
      showCodeBlock,
      order
    },
    isActive
  },
  "freeTrialCard": *[_type == "freeTrialCard" && isActive == true][0] {
    _id,
    title {
      line1,
      line2
    },
    buttons {
      primaryButton {
        text,
        href,
        ariaLabel
      },
      secondaryButton {
        text,
        href,
        ariaLabel
      }
    },
    stats {
      timeSaved {
        label,
        percentage,
        increase
      },
      hireQuality {
        label,
        percentage,
        increase
      }
    },
    metrics[] {
      text
    },
    progressBar {
      percentage
    },
    isActive
  },
  "pricingCard": *[_type == "pricingCard" && isActive == true][0] {
    _id,
    sectionHeader {
      title {
        beforeHighlight,
        highlightedWord,
        afterHighlight
      },
      subtitle
    },
    pricingTiers[] | order(displayOrder asc) {
      name,
      price {
        amount,
        period,
        originalPrice,
        discountBadge
      },
      description,
      isHighlighted,
      features[] {
        text,
        included,
        highlight,
        tooltip
      },
      ctaButton {
        text,
        url,
        style,
        openInNewTab,
        ariaLabel
      },
      additionalInfo {
        freeTrialDays,
        setupFee,
        minimumUsers,
        maxUsers
      },
      displayOrder
    },
    sectionSettings {
      backgroundColor,
      showComparison,
      showAnnualDiscount,
      annualDiscountPercent
    },
    seoSettings {
      sectionId,
      trackingEvents[] {
        eventName,
        trigger
      }
    },
    isActive
  },
  "footer": *[_type == "footer" && isActive == true][0] {
    _id,
    brand {
      logo {
        image {
          asset->{
            _id,
            url
          },
          alt
        },
        alt,
        width,
        height
      },
      description,
      poweredBy {
        text,
        company,
        email
      }
    },
    navigationSections[] {
      title,
      links[] {
        label,
        href,
        isExternal,
        ariaLabel
      },
      displayOrder
    } | order(displayOrder asc),
    socialLinks {
      linkedin {
        url,
        ariaLabel,
        isActive
      },
      instagram {
        url,
        ariaLabel,
        isActive
      },
      email {
        address,
        ariaLabel,
        isActive
      },
      customSocials[] {
        platform,
        url,
        ariaLabel,
        iconSvg,
        isActive
      }
    },
    styling {
      backgroundColor,
      customBackgroundColor {
        hex
      },
      borderStyle
    },
    seoSettings {
      footerId,
      structuredData,
      cookieNotice {
        enabled,
        text,
        linkText,
        linkUrl
      }
    },
    isActive
  }
}`;

// Individual timeline query
export const TIMELINE_QUERY = groq`*[_type == "timeline" && isActive == true][0] {
  _id,
  title,
  subtitle,
  items[] | order(order asc) {
    title,
    description,
    emoji,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    video {
      asset->{
        _id,
        url
      },
      alt
    },
    videoUrl,
    showCodeBlock,
    },
  isActive
}`;

// Individual free trial card query
export const FREE_TRIAL_CARD_QUERY = groq`*[_type == "freeTrialCard" && isActive == true][0] {
  _id,
  title {
    line1,
    line2
  },
  buttons {
    primaryButton {
      text,
      href,
      ariaLabel
    },
    secondaryButton {
      text,
      href,
      ariaLabel
    }
  },
  stats {
    timeSaved {
      label,
      percentage,
      increase
    },
    hireQuality {
      label,
      percentage,
      increase
    }
  },
  metrics[] {
    text
  },
  progressBar {
    percentage
  },
  isActive
}`;

// Individual pricing card query
export const PRICING_CARD_QUERY = groq`*[_type == "pricingCard" && isActive == true][0] {
  _id,
  sectionHeader {
    title {
      beforeHighlight,
      highlightedWord,
      afterHighlight
    },
    subtitle
  },
  pricingTiers[] | order(displayOrder asc) {
    name,
    price {
      amount,
      period,
      originalPrice,
      discountBadge
    },
    description,
    isHighlighted,
    features[] {
      text,
      included,
      highlight,
      tooltip
    },
    ctaButton {
      text,
      url,
      style,
      openInNewTab,
      ariaLabel
    },
    additionalInfo {
      freeTrialDays,
      setupFee,
      minimumUsers,
      maxUsers
    },
    displayOrder
  },
  sectionSettings {
    backgroundColor,
    showComparison,
    showAnnualDiscount,
    annualDiscountPercent
  },
  seoSettings {
    sectionId,
    trackingEvents[] {
      eventName,
      trigger
    }
  },
  isActive
}`;

// Footer query
export const FOOTER_QUERY = groq`*[_type == "footer" && isActive == true][0] {
  _id,
  brand {
    logo {
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      alt,
      width,
      height
    },
    description,
    poweredBy {
      text,
      company,
      email
    }
  },
  navigationSections[] {
    title,
    links[] {
      label,
      href,
      isExternal,
      ariaLabel
    },
    displayOrder
  } | order(displayOrder asc),
  socialLinks {
    linkedin {
      url,
      ariaLabel,
      isActive
    },
    instagram {
      url,
      ariaLabel,
      isActive
    },
    email {
      address,
      ariaLabel,
      isActive
    },
    customSocials[] {
      platform,
      url,
      ariaLabel,
      iconSvg,
      isActive
    }
  },
  styling {
    backgroundColor,
    customBackgroundColor {
      hex
    },
    borderStyle
  },
  seoSettings {
    footerId,
    structuredData,
    cookieNotice {
      enabled,
      text,
      linkText,
      linkUrl
    }
  },
  isActive
}`;

// You can add more queries here as needed
// export const ABOUT_QUERY = groq`*[_type == "about"][0] { ... }`;
