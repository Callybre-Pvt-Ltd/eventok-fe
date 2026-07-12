import { PortfolioSection } from '@/components/ui/portfolio-section';
import { useWedluxPortfolio } from './helper';

export function WedluxPortfolio() {
  const { eyebrowLabel, projects } = useWedluxPortfolio();

  return <PortfolioSection eyebrowLabel={eyebrowLabel} projects={projects} />;
}
