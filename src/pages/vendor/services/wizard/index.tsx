import { useEffect, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { ROUTES } from '@/constants/routes';
import { vendorService } from '@/services';
import { scrollToTop } from '@/utils/scroll';
import {
  STEP_LABELS,
  TOTAL_STEPS,
  useServiceWizard,
  type ServiceImage,
} from './helper';
import {
  AddonsStep,
  AreaStep,
  BasicsStep,
  IncludedStep,
  PhotosStep,
  PoliciesStep,
  PricingStep,
  ReviewStep,
} from './steps';
import {
  Divider,
  DraftSavedTag,
  Eyebrow,
  FooterActions,
  FooterBar,
  Heading,
  Lead,
  MobileProgressFill,
  MobileProgressTrack,
  MobileStepHeader,
  MobileStepLabel,
  Shell,
  StepBody,
  StepDot,
  StepItem,
  StepRail,
  TopBar,
  TopBarActions,
  TopBarLeft,
} from './styled';

export default function ServiceWizardPage() {
  const { palette } = usePortalPalette();
  const navigate = useNavigate();
  const wizard = useServiceWizard();
  const [images, setImages] = useState<ServiceImage[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, [wizard.step]);

  const refreshImages = async (serviceId: string) => {
    const res = await vendorService.listServiceImages(serviceId);
    if (!res.error) setImages(res.data ?? []);
  };

  useEffect(() => {
    if (wizard.serviceId) refreshImages(wizard.serviceId);
  }, [wizard.serviceId]);

  if (wizard.loadingInitial) return <LoadingState />;

  const handleUpload = async (files: File[]) => {
    if (!wizard.serviceId) return;
    setUploading(true);
    for (const file of files.slice(0, wizard.maxImages - images.length)) {
      const res = await vendorService.uploadServiceImage(
        wizard.serviceId,
        file,
      );
      if (res.error) message.error(res.error);
    }
    setUploading(false);
    refreshImages(wizard.serviceId);
  };

  const handleDelete = async (imageId: string) => {
    if (!wizard.serviceId) return;
    const res = await vendorService.deleteServiceImage(
      wizard.serviceId,
      imageId,
    );
    if (res.error) {
      message.error(res.error);
      return;
    }
    refreshImages(wizard.serviceId);
  };

  const handleReorder = async (newOrderIds: string[]) => {
    if (!wizard.serviceId) return;
    const res = await vendorService.reorderServiceImages(
      wizard.serviceId,
      newOrderIds,
    );
    if (res.error) {
      message.error(res.error);
      return;
    }
    setImages(res.data ?? []);
  };

  const handleClose = () => {
    if (wizard.title || wizard.price) {
      Modal.confirm({
        title: 'You have unsaved changes',
        content: 'Would you like to save your draft before leaving?',
        okText: 'Save draft & exit',
        cancelText: 'Discard changes',
        onOk: () => wizard.saveAndExit(),
        onCancel: () => navigate(ROUTES.VENDOR_SERVICES),
      });
    } else {
      navigate(ROUTES.VENDOR_SERVICES);
    }
  };

  const canContinue = () => {
    if (wizard.step === 1)
      return wizard.categoryId.trim() && wizard.title.trim();
    if (wizard.step === 2) return Number(wizard.price) > 0;
    return true;
  };

  const isLastStep = wizard.step === TOTAL_STEPS;

  return (
    <Shell>
      <TopBar>
        <TopBarLeft>
          <Eyebrow>Service listing</Eyebrow>
          <Heading $palette={palette}>
            {wizard.isEditing ? 'Edit service' : 'Create a new service'}
          </Heading>
          <Lead $palette={palette}>
            Eight short steps: the basics, what it costs, what is included, and
            the photos that sell it. Everything is saved as a draft as you go,
            and nothing goes live until you publish.
          </Lead>
        </TopBarLeft>
        <TopBarActions>
          {wizard.draftSavedJustNow && (
            <DraftSavedTag>Draft saved</DraftSavedTag>
          )}
          <Button onClick={wizard.saveAndExit}>Save draft</Button>
          <Button
            type="text"
            icon={<X size={16} />}
            onClick={handleClose}
            aria-label="Close"
          />
        </TopBarActions>
      </TopBar>

      <StepRail>
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const state =
            n < wizard.step
              ? ('done' as const)
              : n === wizard.step
              ? ('active' as const)
              : ('upcoming' as const);
          const clickable = wizard.isEditing || n <= wizard.maxUnlocked;
          return (
            <StepItem
              key={label}
              $state={state}
              $clickable={clickable}
              onClick={() => clickable && wizard.setStep(n)}
            >
              <StepDot $state={state}>
                {state === 'done' ? <Check size={11} /> : n}
              </StepDot>
              {label}
            </StepItem>
          );
        })}
      </StepRail>

      <MobileStepHeader>
        <MobileStepLabel $palette={palette}>
          Step {wizard.step} of {TOTAL_STEPS} · {STEP_LABELS[wizard.step - 1]}
        </MobileStepLabel>
        <MobileProgressTrack>
          <MobileProgressFill $percent={(wizard.step / TOTAL_STEPS) * 100} />
        </MobileProgressTrack>
      </MobileStepHeader>

      <Divider />

      <StepBody $palette={palette}>
        {wizard.step === 1 && <BasicsStep wizard={wizard} />}
        {wizard.step === 2 && <PricingStep wizard={wizard} />}
        {wizard.step === 3 && <IncludedStep wizard={wizard} />}
        {wizard.step === 4 && <AddonsStep wizard={wizard} />}
        {wizard.step === 5 && <AreaStep wizard={wizard} />}
        {wizard.step === 6 && (
          <PhotosStep
            wizard={wizard}
            images={images}
            uploading={uploading}
            onUpload={handleUpload}
            onDelete={handleDelete}
            onReorder={handleReorder}
          />
        )}
        {wizard.step === 7 && <PoliciesStep wizard={wizard} />}
        {wizard.step === 8 && <ReviewStep wizard={wizard} images={images} />}
      </StepBody>

      {!wizard.publishedJustNow ? (
        <FooterBar $palette={palette}>
          <Button disabled={wizard.step === 1} onClick={wizard.goBack}>
            Back
          </Button>
          <FooterActions>
            {isLastStep ? (
              <Button
                type="primary"
                loading={wizard.saving}
                onClick={wizard.publish}
              >
                Publish service
              </Button>
            ) : (
              <Button
                type="primary"
                loading={wizard.saving}
                disabled={!canContinue()}
                onClick={wizard.goNext}
              >
                Continue
              </Button>
            )}
          </FooterActions>
        </FooterBar>
      ) : (
        <FooterBar $palette={palette}>
          <Button onClick={() => navigate(ROUTES.VENDOR_SERVICES)}>
            Manage services
          </Button>
          <Button type="primary" onClick={() => window.location.reload()}>
            Create another
          </Button>
        </FooterBar>
      )}
    </Shell>
  );
}
