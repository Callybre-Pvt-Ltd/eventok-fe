import { Children } from './styled';

interface ContainerProps {
  children: React.ReactNode;
  narrow?: boolean;
  wide?: boolean;
}

export function Container({ children, narrow, wide }: ContainerProps) {
  return (
    <Children $narrow={narrow} $wide={wide}>
      {children}
    </Children>
  );
}
