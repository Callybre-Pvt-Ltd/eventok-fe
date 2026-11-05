import {
  Baby,
  Briefcase,
  Cake,
  Heart,
  LayoutGrid,
  PartyPopper,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import {
  BarInner,
  BarWrap,
  CategoryItem,
  CategoryLabel,
  GridButton,
  IconBox,
  ItemsScroller,
} from './styled';

const CATEGORIES = [
  { label: 'Weddings', slug: 'mandap-decoration', icon: Heart },
  { label: 'Birthdays', slug: 'birthday-decoration', icon: Cake },
  { label: 'Anniversary', slug: 'romantic-room-decor', icon: Sparkles },
  { label: 'Baby Shower', slug: 'pastel-baby-shower', icon: Baby },
  { label: 'Theme Parties', slug: 'house-drapes-decoration', icon: PartyPopper },
  { label: 'Corporate Events', slug: 'venue-decoration', icon: Briefcase },
  { label: 'Dinner & Dates', slug: 'home-floral-decor', icon: UtensilsCrossed },
];

export function CategoryIconBar() {
  return (
    <BarWrap>
      <BarInner>
        <GridButton type="button" aria-label="All Categories">
          <LayoutGrid size={20} />
        </GridButton>
        <ItemsScroller>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <CategoryItem key={cat.slug} to={`/category/${cat.slug}`}>
                <IconBox>
                  <Icon size={18} strokeWidth={1.75} />
                </IconBox>
                <CategoryLabel>{cat.label}</CategoryLabel>
              </CategoryItem>
            );
          })}
        </ItemsScroller>
      </BarInner>
    </BarWrap>
  );
}

export default CategoryIconBar;

