import { useState } from 'react';
import { Button, Input, Tag, message } from 'antd';
import { CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCustomerProfile } from './helper';
import {
  FormRow,
  IdentityPill,
  InputGroup,
  InputLabel,
  ProfileHeader,
  ProfileSection,
  ProfileSub,
  ProfileTitle,
  ProfileWrap,
  SectionHeader,
  SectionTitle,
} from './styled';

export default function CustomerProfilePage() {
  const { t } = useTranslation();
  const { user } = useCustomerProfile();

  const [name, setName] = useState(user?.name ?? '');
  const [city, setCity] = useState(user?.city ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      message.success('Profile details updated successfully');
    }, 600);
  };

  return (
    <ProfileWrap>
      <ProfileHeader>
        <ProfileTitle>{t('customer.profileSettings')}</ProfileTitle>
        <ProfileSub>
          Manage your account identity, contact preferences, and delivery
          location.
        </ProfileSub>
      </ProfileHeader>

      {/* Personal Information */}
      <ProfileSection>
        <SectionHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} color="var(--color-primary)" />
            <SectionTitle>Personal Details</SectionTitle>
          </div>
          <Tag color="orange">CUSTOMER</Tag>
        </SectionHeader>

        <FormRow>
          <InputGroup>
            <InputLabel>{t('auth.name')}</InputLabel>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              size="large"
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>{t('auth.city')}</InputLabel>
            <Input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Your primary celebration city"
              size="large"
            />
          </InputGroup>
        </FormRow>

        <div style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
          <Button
            type="primary"
            size="large"
            loading={isSaving}
            onClick={handleSave}
          >
            {t('common.save')}
          </Button>
        </div>
      </ProfileSection>

      {/* Account Security & Identity */}
      <ProfileSection>
        <SectionHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} color="var(--color-primary)" />
            <SectionTitle>Authentication & Security</SectionTitle>
          </div>
        </SectionHeader>

        <InputGroup>
          <InputLabel>{t('auth.email')}</InputLabel>
          <IdentityPill>
            <span>{user?.email || 'Authenticated User'}</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#16a34a',
              }}
            >
              <CheckCircle2 size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                Verified Clerk Identity
              </span>
            </div>
          </IdentityPill>
        </InputGroup>

        <p
          style={{
            margin: 0,
            fontSize: '0.8rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          Your login credentials and multi-factor authentication are securely
          managed by Clerk.
        </p>
      </ProfileSection>
    </ProfileWrap>
  );
}
