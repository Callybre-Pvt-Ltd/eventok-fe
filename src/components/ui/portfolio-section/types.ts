export interface PortfolioStat {
  value: number;
  label: string;
}

export interface PortfolioProject {
  id: string;
  image: string;
  title: string;
  location: string;
  category: string;
  story: string;
  metadata: string;
  eventType: string;
  year: string;
  guests: string;
  rating: number;
  vendorName: string;
  vendorInitials: string;
  stat: PortfolioStat;
  ctaLabel: string;
  ctaTo: string;
  accent: string;
}
