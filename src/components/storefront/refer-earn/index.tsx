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
              onChange={event => refer.setEnteredCode(event.target.value)}
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
