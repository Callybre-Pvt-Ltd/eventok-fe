import { Text } from '../Text';
import { EyebrowWrap } from './styled';

interface EyebrowProps {
  children: React.ReactNode;
}

export function Eyebrow({ children }: EyebrowProps) {
  return (
    <EyebrowWrap>
      <Text variant="eyebrow" color="brand">
        {children}
      </Text>
    </EyebrowWrap>
  );
}
