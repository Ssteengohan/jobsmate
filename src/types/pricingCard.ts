export interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
  tooltip?: string;
}

export interface PricingPrice {
  amount: string;
  period: 'per-month' | 'per-year' | 'one-time' | 'custom';
  originalPrice?: string;
  discountBadge?: string;
}

export interface PricingCTA {
  text: string;
  url: string;
  style: 'primary' | 'gradient' | 'outline' | 'ghost';
  openInNewTab: boolean;
  ariaLabel?: string;
}

export interface PricingAdditionalInfo {
  freeTrialDays?: number;
  setupFee?: string;
  minimumUsers?: number;
  maxUsers?: string;
}

export interface PricingTier {
  name: string;
  price: PricingPrice;
  description: string;
  isHighlighted: boolean;
  features: PricingFeature[];
  ctaButton: PricingCTA;
  additionalInfo?: PricingAdditionalInfo;
  displayOrder: number;
}

export interface SectionHeader {
  title: {
    beforeHighlight: string;
    highlightedWord: string;
    afterHighlight?: string;
  };
  subtitle: string;
}

export interface SectionSettings {
  backgroundColor: 'gradient' | 'white' | 'dark' | 'transparent';
  showComparison: boolean;
  showAnnualDiscount: boolean;
  annualDiscountPercent?: number;
}

export interface SEOSettings {
  sectionId: string;
  trackingEvents?: Array<{
    eventName: string;
    trigger: 'button_click' | 'section_view' | 'plan_hover';
  }>;
}

export interface PricingCardData {
  _id: string;
  sectionHeader: SectionHeader;
  pricingTiers: PricingTier[];
  sectionSettings: SectionSettings;
  seoSettings: SEOSettings;
  isActive: boolean;
}
