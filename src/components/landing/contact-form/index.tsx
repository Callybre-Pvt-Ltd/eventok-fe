import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/theme';
import { useContactForm } from './helper';
import {
  Field,
  Form,
  Input,
  Label,
  Section,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SuccessMsg,
  TextArea,
} from './styled';

export function ContactForm() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { submitted, loading, onSubmit } = useContactForm();

  if (submitted) {
    return (
      <Section $palette={palette}>
        <SuccessMsg $palette={palette}>
          {t('landing.contactSuccess')}
        </SuccessMsg>
      </Section>
    );
  }

  return (
    <Section $palette={palette}>
      <SectionHeader>
        <SectionTitle $palette={palette}>
          {t('landing.contactTitle')}
        </SectionTitle>
        <SectionSubtitle $palette={palette}>
          {t('landing.contactSubtitle')}
        </SectionSubtitle>
      </SectionHeader>
      <Form
        onSubmit={e => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          onSubmit({
            name: fd.get('name') as string,
            email: fd.get('email') as string,
            message: fd.get('message') as string,
          });
        }}
      >
        <Field $palette={palette}>
          <Label $palette={palette}>{t('landing.contactName')}</Label>
          <Input
            $palette={palette}
            name="name"
            placeholder={t('landing.contactName')}
            required
          />
        </Field>
        <Field $palette={palette}>
          <Label $palette={palette}>{t('landing.contactEmail')}</Label>
          <Input
            $palette={palette}
            name="email"
            type="email"
            placeholder={t('landing.contactEmail')}
            required
          />
        </Field>
        <Field $palette={palette}>
          <Label $palette={palette}>{t('landing.contactMessage')}</Label>
          <TextArea
            $palette={palette}
            name="message"
            placeholder={t('landing.contactMessage')}
            required
          />
        </Field>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        >
          {t('landing.contactSend')}
        </Button>
      </Form>
    </Section>
  );
}
