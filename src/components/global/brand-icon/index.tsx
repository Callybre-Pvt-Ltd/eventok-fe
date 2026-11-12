import React from 'react';

export interface BrandIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'app' | 'favicon';
}

export const BrandIcon: React.FC<BrandIconProps> = ({
  size = 28,
  className,
  style,
  variant = 'app',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="#EA580C" />
      {variant === 'favicon' ? (
        <>
          <path
            d="M27 15H18C15 15 13 17 13 20V28C13 31 15 33 18 33H27"
            stroke="#FFFFFF"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 25L24.5 29.5L34 19"
            stroke="#FFFFFF"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M28.5 14.5H18C14.8 14.5 12.5 16.8 12.5 20V28C12.5 31.2 14.8 33.5 18 33.5H28.5"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.5 24.5L24.5 29.5L34.5 18"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

export default BrandIcon;
