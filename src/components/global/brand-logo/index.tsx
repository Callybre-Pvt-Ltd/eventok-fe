import React from 'react';
import { BrandIcon } from '@/components/global/brand-icon';
import { ROUTES } from '@/constants/routes';
import { Accent, LogoLink, LogoWrap, Wordmark } from './styled';

export interface BrandLogoProps {
  size?: number;
  fontSize?: string;
  to?: string | false;
  color?: string;
  accentColor?: string;
  showWordmark?: boolean;
  collapsed?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  'aria-label'?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 28,
  fontSize,
  to = ROUTES.HOME,
  color,
  accentColor = '#ea580c',
  showWordmark = true,
  collapsed = false,
  className,
  style,
  onClick,
  'aria-label': ariaLabel = 'EventOK',
}) => {
  const content = (
    <>
      <BrandIcon size={size} style={{ flexShrink: 0 }} />
      {showWordmark && !collapsed && (
        <Wordmark $collapsed={collapsed}>
          Event<Accent $accentColor={accentColor}>OK</Accent>
        </Wordmark>
      )}
    </>
  );

  if (to === false) {
    return (
      <LogoWrap
        $color={color}
        $fontSize={fontSize}
        className={className}
        style={style}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {content}
      </LogoWrap>
    );
  }

  return (
    <LogoLink
      to={to}
      $color={color}
      $fontSize={fontSize}
      className={className}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </LogoLink>
  );
};

export default BrandLogo;
