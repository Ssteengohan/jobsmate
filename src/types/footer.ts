// Footer Type Definitions for Sanity CMS Integration

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
  ariaLabel?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
  displayOrder?: number;
}

export interface FooterLogo {
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  alt: string;
  width?: number;
  height?: number;
}

export interface FooterBrand {
  logo: FooterLogo;
  description: string;
  poweredBy?: {
    text: string;
    company: string;
    email: string;
  };
}

export interface SocialLinkConfig {
  url: string;
  ariaLabel: string;
  isActive: boolean;
}

export interface CustomSocialLink {
  platform: string;
  url: string;
  ariaLabel?: string;
  iconSvg?: string;
  isActive: boolean;
}

export interface FooterSocialLinks {
  linkedin?: SocialLinkConfig;
  instagram?: SocialLinkConfig;
  email?: {
    address: string;
    ariaLabel: string;
    isActive: boolean;
  };
  customSocials?: CustomSocialLink[];
}

export interface FooterStyling {
  backgroundColor: 'default' | 'dark' | 'primary' | 'white' | 'custom';
  customBackgroundColor?: {
    hex: string;
  };
  borderStyle: 'default' | 'none' | 'thick' | 'gradient';
}

export interface FooterSeoSettings {
  footerId?: string;
  structuredData?: boolean;
  cookieNotice?: {
    enabled: boolean;
    text?: string;
    linkText?: string;
    linkUrl?: string;
  };
}

export interface FooterData {
  brand: FooterBrand;
  navigationSections: FooterSection[];
  socialLinks: FooterSocialLinks;
  styling?: FooterStyling;
  seoSettings?: FooterSeoSettings;
  isActive: boolean;
}

// Fallback interfaces for backward compatibility
export interface LegacyFooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface LegacyFooterSection {
  title: string;
  links: LegacyFooterLink[];
}

// Type guards for runtime type checking
export const isFooterData = (data: unknown): data is FooterData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'brand' in data &&
    'navigationSections' in data &&
    'socialLinks' in data &&
    'isActive' in data
  );
};

export const isLegacyFooterData = (sections: unknown): sections is LegacyFooterSection[] => {
  return Array.isArray(sections) && sections.every(section => 
    typeof section === 'object' &&
    section !== null &&
    'title' in section &&
    'links' in section
  );
};
