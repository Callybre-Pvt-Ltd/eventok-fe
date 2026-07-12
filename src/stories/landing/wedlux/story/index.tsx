import { useTranslation } from 'react-i18next';
import { SectionShell, SerifTitle, WhiteSection } from '../shared/styled';
import { useWedluxStory } from './helper';
import {
  StatLabel,
  StatValue,
  StatsRow,
  StoryBody,
  StoryGrid,
  StoryImage,
  StoryMedia,
} from './styled';

export function WedluxStory() {
  const { t } = useTranslation();
  const { scope, stats, image } = useWedluxStory();

  return (
    <WhiteSection id="story" ref={scope}>
      <SectionShell>
        <StoryGrid>
          <SerifTitle data-reveal>{t('landing.wedluxStoryTitle')}</SerifTitle>
          <StoryBody data-reveal>{t('landing.wedluxStoryBody')}</StoryBody>
        </StoryGrid>

        <StoryMedia data-reveal>
          <StoryImage
            src={image}
            alt={t('landing.wedluxStoryTitle')}
            loading="lazy"
            data-parallax
            data-parallax-speed="6"
          />
        </StoryMedia>

        <StatsRow>
          {stats.map(stat => (
            <div key={stat.valueKey} data-reveal-group="story-stats">
              <StatValue>{t(stat.valueKey)}</StatValue>
              <StatLabel>{t(stat.labelKey)}</StatLabel>
            </div>
          ))}
        </StatsRow>
      </SectionShell>
    </WhiteSection>
  );
}
