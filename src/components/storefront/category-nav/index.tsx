import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useCategoryNav } from './helper';
import { NavBar, NavGroup, NavScroller, NavTrigger } from './styled';

export function CategoryNav() {
  const { t } = useTranslation();
  const { groups } = useCategoryNav();
  const { pathname, search } = useLocation();

  return (
    <NavBar aria-label={t('storefront.navAllServices')}>
      <NavScroller>
        {groups.map(group => {
          const isActive = `${pathname}${search}` === group.to;

          if (group.children.length > 0) {
            const items: MenuProps['items'] = [
              {
                key: `all-${group.key}`,
                label: (
                  <Link
                    to={group.to}
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      color: 'var(--color-primary)',
                      padding: '2px 0',
                    }}
                  >
                    {t('common.viewAll')} {t(group.labelKey)}
                  </Link>
                ),
              },
              { type: 'divider' },
              ...group.children.map(category => ({
                key: category.slug,
                label: (
                  <Link
                    to={`/category/${category.slug}`}
                    style={{
                      display: 'block',
                      minWidth: '160px',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '2px 0',
                    }}
                  >
                    <span>{category.name}</span>
                  </Link>
                ),
              })),
            ];

            return (
              <Dropdown
                key={group.key}
                menu={{ items }}
                trigger={['hover', 'click']}
                placement="bottomLeft"
              >
                <NavGroup>
                  <NavTrigger to={group.to} $active={isActive}>
                    {t(group.labelKey)}
                    <ChevronDown size={14} />
                  </NavTrigger>
                </NavGroup>
              </Dropdown>
            );
          }

          return (
            <NavGroup key={group.key}>
              <NavTrigger to={group.to} $active={isActive}>
                {t(group.labelKey)}
              </NavTrigger>
            </NavGroup>
          );
        })}
      </NavScroller>
    </NavBar>
  );
}
