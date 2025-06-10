export interface FreeTrialCardData {
  _id: string;
  title: {
    line1: string;
    line2: string;
  };
  buttons: {
    primaryButton: {
      text: string;
      href: string;
      ariaLabel: string;
    };
    secondaryButton: {
      text: string;
      href: string;
      ariaLabel: string;
    };
  };
  stats: {
    timeSaved: {
      label: string;
      percentage: number;
      increase: number;
    };
    hireQuality: {
      label: string;
      percentage: number;
      increase: number;
    };
  };
  metrics: Array<{
    text: string;
  }>;
  progressBar: {
    percentage: number;
  };
  isActive: boolean;
}
