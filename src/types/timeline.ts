export interface TimelineItem {
  title: string;
  description: string;
  emoji: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    } | null;
    alt?: string;
  } | null;
  video?: {
    asset: {
      _id: string;
      url: string;
    } | null;
    alt?: string;
  } | null;
  videoUrl?: string;
  showCodeBlock?: boolean;
  order: number;
}

export interface TimelineData {
  _id: string;
  title: string;
  subtitle?: string;
  items: TimelineItem[];
  isActive: boolean;
}
