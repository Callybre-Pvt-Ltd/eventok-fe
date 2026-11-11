import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import {
  ActionButton,
  BuilderCtaInner,
  BuilderCtaSection,
  Description,
  Eyebrow,
  Heading,
  LeftDetails,
  PreviewBadge,
  PreviewHeader,
  PreviewList,
  PreviewRow,
  PreviewTitle,
  PreviewTotal,
  RightInteractivePreview,
  StepCopy,
  StepItem,
  StepNumber,
  StepsRow,
  StepSub,
  StepTitle,
  TotalAmount,
  TotalLabel,
} from './styled';

export function PackageBuilderCta() {
  return (
    <BuilderCtaSection>
      <BuilderCtaInner>
        <LeftDetails>
          <Eyebrow>Bespoke Event Customization</Eyebrow>
          <Heading>
            Build Your Dream Celebration <span>Piece by Piece</span>
          </Heading>
          <Description>
            Tired of rigid packages with items you don&apos;t need? Our
            interactive builder lets you handpick backdrops, floral elements,
            seating, and special effects with real-time price calculation.
          </Description>

          <StepsRow>
            <StepItem>
              <StepNumber>1</StepNumber>
              <StepCopy>
                <StepTitle>Select Celebration &amp; Base Theme</StepTitle>
                <StepSub>
                  Choose from 40+ curated backdrops and spatial layouts.
                </StepSub>
              </StepCopy>
            </StepItem>

            <StepItem>
              <StepNumber>2</StepNumber>
              <StepCopy>
                <StepTitle>Add Custom Elements &amp; Florals</StepTitle>
                <StepSub>
                  Add fairy curtains, neon text, welcome stands, or photobooths.
                </StepSub>
              </StepCopy>
            </StepItem>

            <StepItem>
              <StepNumber>3</StepNumber>
              <StepCopy>
                <StepTitle>Instant Match With Verified Decorators</StepTitle>
                <StepSub>
                  Lock in available top-rated local teams with zero hidden fees.
                </StepSub>
              </StepCopy>
            </StepItem>
          </StepsRow>

          <ActionButton to={ROUTES.PACKAGE_BUILDER}>
            <Sparkles size={16} /> Open Custom Package Builder{' '}
            <ArrowRight size={16} />
          </ActionButton>
        </LeftDetails>

        <RightInteractivePreview>
          <PreviewHeader>
            <div>
              <PreviewTitle>Live Bundle Preview</PreviewTitle>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                Sample 1st Birthday Setup
              </span>
            </div>
            <PreviewBadge>Customizable</PreviewBadge>
          </PreviewHeader>

          <PreviewList>
            <PreviewRow>
              <span>Pastel Cloud Arch Backdrop</span>
              <span>₹4,200</span>
            </PreviewRow>
            <PreviewRow>
              <span>Custom Neon &apos;ONE&apos; Signage</span>
              <span>₹1,500</span>
            </PreviewRow>
            <PreviewRow>
              <span>Organic Balloon Pedestals (Set of 3)</span>
              <span>₹2,200</span>
            </PreviewRow>
            <PreviewRow>
              <span>Welcome Easel Board with Florals</span>
              <span>₹1,100</span>
            </PreviewRow>
          </PreviewList>

          <PreviewTotal>
            <div>
              <TotalLabel>Estimated Bundle Price</TotalLabel>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: '#16a34a',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  marginTop: '0.2rem',
                }}
              >
                <Check size={12} /> Includes delivery, setup &amp; teardown
              </div>
            </div>
            <TotalAmount>₹9,000</TotalAmount>
          </PreviewTotal>
        </RightInteractivePreview>
      </BuilderCtaInner>
    </BuilderCtaSection>
  );
}
