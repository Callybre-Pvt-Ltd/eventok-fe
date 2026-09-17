import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useCategoryNav } from './helper';
import {
  Flyout,
  FlyoutCount,
  FlyoutLink,
  NavBar,
  NavGroup,
  NavScroller,
  NavTrigger,
} from './styled';

export function CategoryNav() {
  const { t } = useTranslation();
  const { groups } = useCategoryNav();
  const { pathname, search } = useLocation();

  return (
    <NavBar aria-label={t('storefront.navAllServices')}>
      <NavScroller>
        {groups.map(group => (
          <NavGroup key={group.key}>
            <NavTrigger
              to={group.to}
              $active={`${pathname}${search}` === group.to}
            >
              {t(group.labelKey)}
              {group.children.length > 0 && <ChevronDown size={14} />}
            </NavTrigger>
            {group.children.length > 0 && (
              <Flyout>
                {group.children.map(category => (
                  <FlyoutLink
                    key={category.slug}
                    to={`/category/${category.slug}`}
                  >
                    {category.name}
                    <FlyoutCount>{category.serviceCount ?? 0}</FlyoutCount>
                  </FlyoutLink>
                ))}
              </Flyout>
            )}
          </NavGroup>
        ))}
      </NavScroller>
    </NavBar>
  );
}
