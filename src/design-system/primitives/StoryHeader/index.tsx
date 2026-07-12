import { Text } from '../Text';
import { Eyebrow } from '../Eyebrow';
import { HeaderBlock } from './styled';

interface StoryHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
}

export function StoryHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
}: StoryHeaderProps) {
  return (
    <HeaderBlock $align={align}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Text variant="headline" align={align}>
        {title}
      </Text>
      {lead && (
        <Text variant="lead" color="secondary" align={align}>
          {lead}
        </Text>
      )}
    </HeaderBlock>
  );
}
