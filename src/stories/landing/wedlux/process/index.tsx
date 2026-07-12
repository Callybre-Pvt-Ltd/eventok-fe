import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { StepVisual } from './StepVisual';
import { useWedluxProcess } from './helper';
import { processFlowNodes, processTrustBadges } from './steps';
import {
  Eyebrow,
  FlowBoard,
  FlowBridge,
  FlowDot,
  FlowLabel,
  FlowNode,
  FlowTrack,
  FootTrust,
  Header,
  HeaderCopy,
  Journey,
  Lead,
  ProcessRoot,
  ProcessShell,
  SpineCol,
  SpineSvg,
  Step,
  StepBody,
  StepCopy,
  StepHighlight,
  StepNumber,
  StepsCol,
  StepTitle,
  Title,
  TrustPill,
  TrustRow,
} from './styled';

export function WedluxProcess() {
  const { t } = useTranslation();
  const { scope, steps } = useWedluxProcess();

  return (
    <ProcessRoot id="process" ref={scope}>
      <ProcessShell>
        <Header>
          <HeaderCopy>
            <Eyebrow data-how-header>{t('landing.wedluxHowEyebrow')}</Eyebrow>
            <Title data-how-header>{t('landing.wedluxHowTitle')}</Title>
            <Lead data-how-header>{t('landing.wedluxHowLead')}</Lead>
          </HeaderCopy>
          <TrustRow data-how-header>
            {processTrustBadges.map(key => (
              <TrustPill key={key}>
                <ShieldCheck size={12} aria-hidden />
                {t(key)}
              </TrustPill>
            ))}
          </TrustRow>
        </Header>

        <FlowBoard data-how-flow aria-label={t('landing.wedluxHowFlowLabel')}>
          <FlowTrack>
            {processFlowNodes.map((key, index) => (
              <div key={key} style={{ display: 'contents' }}>
                {index > 0 ? <FlowBridge aria-hidden /> : null}
                <FlowNode data-how-flow-node>
                  <FlowDot $accent={index === 2}>
                    {String(index + 1).padStart(2, '0')}
                  </FlowDot>
                  <FlowLabel>{t(key)}</FlowLabel>
                </FlowNode>
              </div>
            ))}
          </FlowTrack>
        </FlowBoard>

        <Journey data-how-journey>
          <SpineCol aria-hidden>
            <SpineSvg viewBox="0 0 24 640" preserveAspectRatio="none">
              <path
                d="M12 8 C 12 8, 12 640, 12 640"
                fill="none"
                stroke="rgba(42,37,34,0.1)"
                strokeWidth="2"
              />
              <path
                data-how-spine
                d="M12 8 C 12 8, 12 640, 12 640"
                fill="none"
                stroke="#C9A227"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </SpineSvg>
          </SpineCol>

          <StepsCol>
            {steps.map((step, index) => (
              <Step key={step.id} data-how-step $flip={index % 2 === 1}>
                <StepCopy>
                  <StepNumber data-how-copy>
                    {step.number}
                    <span aria-hidden>—</span>
                    {t('landing.wedluxHowStepLabel')}
                  </StepNumber>
                  <StepTitle data-how-copy>{t(step.titleKey)}</StepTitle>
                  <StepBody data-how-copy>{t(step.bodyKey)}</StepBody>
                  <StepHighlight data-how-copy>
                    {t(step.highlightKey)}
                  </StepHighlight>
                </StepCopy>
                <StepVisual id={step.id} />
              </Step>
            ))}
          </StepsCol>
        </Journey>

        <FootTrust>
          <ShieldCheck size={16} aria-hidden />
          {t('landing.wedluxHowFootnote')}
        </FootTrust>
      </ProcessShell>
    </ProcessRoot>
  );
}
