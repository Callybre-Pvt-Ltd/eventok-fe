import { useTranslation } from 'react-i18next';
import {
  Check,
  EyeOff,
  Lock,
  MessageSquare,
  Shield,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import type { ProcessStepId } from './steps';
import { processVendorTags, processVisualPhotos } from './steps';
import {
  Actor,
  ActorLabel,
  ActorOrb,
  BridgeArrow,
  BridgeCard,
  BridgeNote,
  BridgeScene,
  BridgeTitle,
  CelebrateImg,
  CelebrateNote,
  CelebrateOverlay,
  CelebrateScene,
  CelebrateTitle,
  EnquireScene,
  EnquireSvg,
  GalleryCell,
  GalleryGrid,
  Packet,
  PayCheck,
  PayMeta,
  PayScene,
  PayTitle,
  Tag,
  TagCloud,
  VendorImg,
  VendorLock,
  VendorMeta,
  VendorMini,
  VendorName,
  VendorStack,
  VisualFrame,
  VisualInner,
} from './styled';

interface StepVisualProps {
  id: ProcessStepId;
}

export function StepVisual({ id }: StepVisualProps) {
  const { t } = useTranslation();

  return (
    <VisualFrame data-how-visual>
      <VisualInner>
        {id === 'explore' ? (
          <>
            <VendorStack>
              {processVisualPhotos.vendors.map((src, index) => (
                <VendorMini key={src} data-how-bit>
                  <VendorImg src={src} alt="" loading="lazy" />
                  <VendorMeta>
                    <VendorName>
                      {t('landing.wedluxHowVendorLabel', {
                        n: index + 1,
                      })}
                    </VendorName>
                    <VendorLock>
                      <Lock size={10} aria-hidden />
                      {t('landing.wedluxHowNoContact')}
                    </VendorLock>
                  </VendorMeta>
                </VendorMini>
              ))}
            </VendorStack>
            <TagCloud>
              {processVendorTags.map(key => (
                <Tag key={key} data-how-bit>
                  {t(key)}
                </Tag>
              ))}
            </TagCloud>
          </>
        ) : null}

        {id === 'discover' ? (
          <GalleryGrid>
            {processVisualPhotos.portfolio.map((src, index) => (
              <GalleryCell key={src} $hero={index === 0} data-how-bit>
                <img src={src} alt="" loading="lazy" />
              </GalleryCell>
            ))}
          </GalleryGrid>
        ) : null}

        {id === 'enquire' ? (
          <EnquireScene>
            <Actor $role="customer" data-how-bit>
              <ActorOrb $role="customer" data-how-icon>
                <Users size={18} aria-hidden />
              </ActorOrb>
              <ActorLabel>{t('landing.wedluxHowActorCustomer')}</ActorLabel>
            </Actor>

            <EnquireSvg
              viewBox="0 0 320 80"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                data-how-path
                d="M12 48 C 90 48, 110 18, 160 18 C 210 18, 230 48, 308 48"
                fill="none"
                stroke="rgba(201,162,39,0.75)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </EnquireSvg>

            <Actor $role="admin" data-how-bit>
              <ActorOrb $role="admin" data-how-icon>
                <Shield size={18} aria-hidden />
              </ActorOrb>
              <ActorLabel>{t('landing.wedluxHowActorAdmin')}</ActorLabel>
            </Actor>

            <Actor $role="vendor" data-how-bit>
              <ActorOrb $role="vendor" data-how-icon>
                <Star size={18} aria-hidden />
              </ActorOrb>
              <ActorLabel>{t('landing.wedluxHowActorVendor')}</ActorLabel>
            </Actor>

            <Packet data-how-packet aria-hidden>
              <MessageSquare size={12} />
            </Packet>
          </EnquireScene>
        ) : null}

        {id === 'admin' ? (
          <BridgeScene>
            <BridgeCard data-how-bit>
              <Users size={18} aria-hidden />
              <BridgeTitle>{t('landing.wedluxHowActorCustomer')}</BridgeTitle>
              <BridgeNote>{t('landing.wedluxHowBridgeCustomer')}</BridgeNote>
            </BridgeCard>
            <BridgeArrow aria-hidden data-how-bit>
              <span>→</span>
              <span>←</span>
            </BridgeArrow>
            <BridgeCard $center data-how-bit>
              <Shield size={20} aria-hidden data-how-icon />
              <BridgeTitle>{t('landing.wedluxHowActorAdmin')}</BridgeTitle>
              <BridgeNote>{t('landing.wedluxHowBridgeAdmin')}</BridgeNote>
            </BridgeCard>
            <BridgeArrow aria-hidden data-how-bit>
              <span>→</span>
              <span>←</span>
            </BridgeArrow>
            <BridgeCard data-how-bit>
              <Star size={18} aria-hidden />
              <BridgeTitle>{t('landing.wedluxHowActorVendor')}</BridgeTitle>
              <BridgeNote>{t('landing.wedluxHowBridgeVendor')}</BridgeNote>
            </BridgeCard>
          </BridgeScene>
        ) : null}

        {id === 'booking' ? (
          <PayScene>
            <PayCheck data-how-bit data-how-icon>
              <Check size={28} strokeWidth={2.5} aria-hidden />
            </PayCheck>
            <PayTitle data-how-bit>{t('landing.wedluxHowPayTitle')}</PayTitle>
            <PayMeta>
              <Tag data-how-bit>{t('landing.wedluxHowPayReceipt')}</Tag>
              <Tag data-how-bit>{t('landing.wedluxHowPayNotify')}</Tag>
              <Tag data-how-bit>{t('landing.wedluxHowPayDashboard')}</Tag>
            </PayMeta>
          </PayScene>
        ) : null}

        {id === 'celebrate' ? (
          <CelebrateScene data-how-bit>
            <CelebrateImg
              src={processVisualPhotos.celebrate}
              alt=""
              loading="lazy"
            />
            <CelebrateOverlay>
              <CelebrateTitle>
                <Sparkles size={16} style={{ marginRight: 6 }} aria-hidden />
                {t('landing.wedluxHowCelebrateTitle')}
              </CelebrateTitle>
              <CelebrateNote>
                {t('landing.wedluxHowCelebrateNote')}
              </CelebrateNote>
            </CelebrateOverlay>
          </CelebrateScene>
        ) : null}

        {id === 'enquire' ? (
          <TagCloud>
            <Tag data-how-bit>
              <EyeOff size={11} style={{ marginRight: 4 }} aria-hidden />
              {t('landing.wedluxHowNoPhone')}
            </Tag>
            <Tag data-how-bit>{t('landing.wedluxHowNoEmail')}</Tag>
            <Tag data-how-bit>{t('landing.wedluxHowNoWhatsapp')}</Tag>
          </TagCloud>
        ) : null}
      </VisualInner>
    </VisualFrame>
  );
}
