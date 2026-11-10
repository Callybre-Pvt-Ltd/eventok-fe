import { Check, Gift, Link2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section, SectionInner } from '@/components/storefront/shared/styled';
import { useReferEarn } from './helper';
import {
  Chip,
  Chips,
  CodeCard,
  CodeRow,
  CodeValue,
  CopyButton,
  Copy,
  Helper,
  Input,
  Label,
  Panel,
  Pill,
  ReferButton,
  SparklesWrap,
  Text,
  Title,
} from './styled';

export function ReferEarn() {
  const { t } = useTranslation();
  const refer = useReferEarn();

  return (
    <Section>
      <SectionInner>
        <Panel>
          <SparklesWrap aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill="rgba(255, 255, 255, 0.75)"
              />
            </svg>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginTop: '12px' }}
            >
              <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill="rgba(255, 255, 255, 0.55)"
              />
            </svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill="rgba(255, 255, 255, 0.65)"
              />
            </svg>
          </SparklesWrap>
          <Copy>
            <Pill>{t('storefront.referEyebrow')}</Pill>
            <Title>{t('storefront.referTitle')}</Title>
            <Text>{t('storefront.referCopy')}</Text>
            <Chips>
              <Chip>
                <Gift size={12} />
                {t('storefront.referChipReward')}
              </Chip>
              <Chip>
                <Check size={12} />
                {t('storefront.referChipCondition')}
              </Chip>
            </Chips>
          </Copy>

          <CodeCard>
            <Label>{t('storefront.referYourCode')}</Label>
            <CodeRow>
              <CodeValue>{refer.code}</CodeValue>
              <CopyButton type="button" onClick={refer.copy}>
                {refer.copied
                  ? t('storefront.referCopied')
                  : t('storefront.referCopyCode')}
              </CopyButton>
            </CodeRow>
            <Input
              value={refer.enteredCode}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                refer.setEnteredCode(event.target.value)
              }
              placeholder={t('storefront.referEnterCode')}
              aria-label={t('storefront.referEnterCode')}
            />
            <ReferButton type="button">
              <Link2 size={14} /> {t('storefront.referNow')}
            </ReferButton>
            <Helper>{t('storefront.referHelper')}</Helper>
          </CodeCard>
        </Panel>
      </SectionInner>
    </Section>
  );
}
