import { Input, InputNumber, Select, message } from 'antd';
import {
  Baby,
  Building2,
  Cake,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  DoorOpen,
  Flower,
  Flower2,
  Gem,
  Heart,
  Home,
  ImagePlus,
  Layers,
  Lightbulb,
  Palette,
  PartyPopper,
  Sparkles,
  Star,
  Tent,
  Trash2,
} from 'lucide-react';
import { Field, FieldLabel } from '@/components/ui/form-modal';
import { ListBuilder } from '@/components/vendor/list-builder';
import { ServiceAddons } from '@/components/vendor/service-addons';
import { LocationPicker } from '@/components/vendor/location-picker';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { ServiceWizard } from './helper';
import {
  CharCount,
  DeletePhotoBtn,
  EstimateNote,
  FieldHint,
  PhotoBtn,
  PhotoControlGroup,
  PhotoControls,
  PhotoGrid,
  PhotoTag,
  PhotoTile,
  PolicySection,
  PolicySubhead,
  PolicyWindowSelector,
  PriceInputWrap,
  PricePanel,
  PriceRow,
  PriceRowLabel,
  PriceRowValue,
  ReviewBlock,
  ReviewCover,
  ReviewGallery,
  ReviewHeadline,
  ReviewImg,
  ReviewLabel,
  ReviewPreviewWrap,
  ReviewPricePanel,
  ReviewValue,
  StepHeading,
  StepIntro,
  StepLead,
  SuccessIcon,
  SuccessWrap,
  UploadHint,
  UploadZone,
  WindowOptionBtn,
} from './styled';

const DESCRIPTION_LIMIT = 300;
const MAX_FILE_SIZE_MB = 5;

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Gem,
  Cake,
  Heart,
  Flower2,
  Baby,
  Sparkles,
  Building2,
  Clapperboard,
  Flower,
  PartyPopper,
  Lightbulb,
  DoorOpen,
  Tent,
  Palette,
  Camera,
  Home,
};

export function BasicsStep({ wizard }: { wizard: ServiceWizard }) {
  const { palette } = usePortalPalette();
  return (
    <>
      <StepIntro>
        <StepHeading $palette={palette}>Service basics</StepHeading>
        <StepLead $palette={palette}>
          Define what this service is. Pick a relevant category and choose a
          clear, descriptive name.
        </StepLead>
      </StepIntro>

      <Field>
        <FieldLabel>Service category</FieldLabel>
        <Select
          size="large"
          showSearch
          placeholder="Select a service category…"
          style={{ width: '100%' }}
          value={wizard.categoryId || undefined}
          onChange={val => wizard.setCategoryId(val)}
          filterOption={(input, opt) =>
            ((opt?.label as string) ?? '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={wizard.categories.map(cat => {
            const IconComponent = (cat.icon && ICON_MAP[cat.icon]) || Layers;
            return {
              value: cat.id,
              label: cat.name,
              desc: cat.description || 'Decoration service',
              IconComponent,
            };
          })}
          optionRender={option => {
            const IconComponent: React.ComponentType<{ size?: number }> =
              (
                option.data as {
                  IconComponent?: React.ComponentType<{ size?: number }>;
                }
              ).IconComponent || Layers;
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#e91e8c', flexShrink: 0 }}>
                  <IconComponent size={16} />
                </span>
                <div>
                  <div style={{ fontWeight: 500, lineHeight: 1.3 }}>
                    {option.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#94a3b8',
                      lineHeight: 1.3,
                    }}
                  >
                    {(option.data as { desc?: string }).desc}
                  </div>
                </div>
              </div>
            );
          }}
        />
      </Field>

      <Field>
        <FieldLabel>Service name</FieldLabel>
        <Input
          value={wizard.title}
          onChange={e => wizard.setTitle(e.target.value)}
          placeholder="e.g. Premium Haldi Decoration with Floral Backdrop"
          size="large"
        />
        <FieldHint>
          Use a clear name customers can understand at a glance.
        </FieldHint>
      </Field>

      <Field>
        <FieldLabel>Short description</FieldLabel>
        <Input.TextArea
          value={wizard.description}
          onChange={e =>
            wizard.setDescription(e.target.value.slice(0, DESCRIPTION_LIMIT))
          }
          placeholder="Describe what makes this service special…"
          rows={4}
        />
        <CharCount>
          {wizard.description.length} / {DESCRIPTION_LIMIT}
        </CharCount>
      </Field>
    </>
  );
}

export function PricingStep({ wizard }: { wizard: ServiceWizard }) {
  const { palette } = usePortalPalette();
  const p = wizard.pricePreview;
  return (
    <>
      <StepIntro>
        <StepHeading $palette={palette}>Set your price</StepHeading>
        <StepLead $palette={palette}>
          Enter the amount you want to earn. EventOK will calculate the
          customer-facing price automatically.
        </StepLead>
      </StepIntro>

      <Field>
        <FieldLabel>Your service price</FieldLabel>
        <PriceInputWrap>
          <InputNumber
            value={wizard.price ? Number(wizard.price) : undefined}
            onChange={v => wizard.setPrice(v ? String(v) : '')}
            placeholder="10000"
            size="large"
            min={1}
            prefix="₹"
          />
        </PriceInputWrap>
        <FieldHint>
          This is the amount you receive before platform commission.
        </FieldHint>
      </Field>

      {Number(wizard.price) > 0 ? (
        <PricePanel>
          <PriceRow>
            <PriceRowLabel $palette={palette}>Your price</PriceRowLabel>
            <PriceRowValue>₹{p.base.toLocaleString('en-IN')}</PriceRowValue>
          </PriceRow>
          <PriceRow>
            <PriceRowLabel $palette={palette}>
              Platform commission (3%)
            </PriceRowLabel>
            <PriceRowValue>
              + ₹{p.commission.toLocaleString('en-IN')}
            </PriceRowValue>
          </PriceRow>
          <PriceRow $final>
            <PriceRowLabel $palette={palette}>Customer pays</PriceRowLabel>
            <PriceRowValue $accent>
              ₹{p.customerTotal.toLocaleString('en-IN')}
            </PriceRowValue>
          </PriceRow>
          <PriceRow>
            <PriceRowLabel $palette={palette}>
              Advance payment (20% upfront)
            </PriceRowLabel>
            <PriceRowValue>₹{p.advance.toLocaleString('en-IN')}</PriceRowValue>
          </PriceRow>
          <PriceRow>
            <PriceRowLabel $palette={palette}>
              Remaining after advance (due at event)
            </PriceRowLabel>
            <PriceRowValue>
              ₹{p.remaining.toLocaleString('en-IN')}
            </PriceRowValue>
          </PriceRow>
          <EstimateNote>
            The 20% advance is calculated on the customer-facing total. Backend
            is the source of truth.
          </EstimateNote>
        </PricePanel>
      ) : null}
    </>
  );
}

export function IncludedStep({ wizard }: { wizard: ServiceWizard }) {
  const { palette } = usePortalPalette();
  return (
    <>
      <StepIntro>
        <StepHeading $palette={palette}>What's included?</StepHeading>
        <StepLead $palette={palette}>
          Tell customers exactly what they'll receive. Break down the elements
          of your setup.
        </StepLead>
      </StepIntro>
      <ListBuilder
        label="Inclusions"
        hint="One item per row. Reorder or edit any item."
        placeholder="e.g. Complete theme & colour setup"
        emptyText="Nothing added yet — type an inclusion above and press +."
        items={wizard.whatsIncluded}
        onChange={wizard.setWhatsIncluded}
      />
    </>
  );
}

export function AddonsStep({ wizard }: { wizard: ServiceWizard }) {
  const { palette } = usePortalPalette();
  return (
    <>
      <StepIntro>
        <StepHeading $palette={palette}>Offer optional extras</StepHeading>
        <StepLead $palette={palette}>
          Give customers the option to customise their booking. Important: No
          platform commission is applied to add-ons — customers pay exactly what
          you specify.
        </StepLead>
      </StepIntro>
      {wizard.serviceId ? (
        <ServiceAddons serviceId={wizard.serviceId} />
      ) : (
        <StepLead $palette={palette}>
          Please continue to the next step. Your draft will save and you can add
          extras.
        </StepLead>
      )}
    </>
  );
}

export function AreaStep({ wizard }: { wizard: ServiceWizard }) {
  const { palette } = usePortalPalette();
  return (
    <>
      <StepIntro>
        <StepHeading $palette={palette}>Service locations</StepHeading>
        <StepLead $palette={palette}>
          Where do you provide this service? Select supported states and cities.
        </StepLead>
      </StepIntro>
      {wizard.vendorId ? <LocationPicker vendorId={wizard.vendorId} /> : null}
    </>
  );
}

export function PhotosStep({
  wizard,
  images,
  uploading,
  onUpload,
  onDelete,
  onReorder,
}: {
  wizard: ServiceWizard;
  images: { id: string; image_url: string }[];
  uploading: boolean;
  onUpload: (files: File[]) => void;
  onDelete: (imageId: string) => void;
  onReorder: (newOrderIds: string[]) => void;
}) {
  const { palette } = usePortalPalette();

  const handleFiles = (incoming: File[]) => {
    const valid = incoming.filter(f => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
        message.error(`"${f.name}" is not a supported format (JPG, PNG, WebP)`);
        return false;
      }
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        message.error(`"${f.name}" exceeds ${MAX_FILE_SIZE_MB}MB limit`);
        return false;
      }
      return true;
    });
    if (valid.length) onUpload(valid);
  };

  const handleSetCover = (id: string) => {
    const remaining = images.filter(img => img.id !== id).map(img => img.id);
    onReorder([id, ...remaining]);
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const ids = images.map(i => i.id);
    const temp = ids[index];
    ids[index] = ids[target];
    ids[target] = temp;
    onReorder(ids);
  };

  return (
    <>
      <StepIntro>
        <StepHeading $palette={palette}>Show your work</StepHeading>
        <StepLead $palette={palette}>
          Great photos help customers understand the quality of your service.
          The first photo is your cover photo displayed on marketplace search.
        </StepLead>
      </StepIntro>

      <PhotoGrid>
        {images.map((img, index) => {
          const isCover = index === 0;
          return (
            <PhotoTile key={img.id}>
              <img src={img.image_url} alt="" />
              <PhotoTag $cover={isCover}>
                {isCover ? 'Cover Photo' : `Photo ${index + 1}`}
              </PhotoTag>
              <PhotoControls>
                <PhotoControlGroup>
                  {!isCover && (
                    <PhotoBtn
                      type="button"
                      title="Set as Cover"
                      onClick={() => handleSetCover(img.id)}
                    >
                      <Star size={11} />
                    </PhotoBtn>
                  )}
                  <PhotoBtn
                    type="button"
                    title="Move left"
                    disabled={index === 0}
                    onClick={() => handleMove(index, -1)}
                  >
                    <ChevronLeft size={11} />
                  </PhotoBtn>
                  <PhotoBtn
                    type="button"
                    title="Move right"
                    disabled={index === images.length - 1}
                    onClick={() => handleMove(index, 1)}
                  >
                    <ChevronRight size={11} />
                  </PhotoBtn>
                </PhotoControlGroup>
                <DeletePhotoBtn
                  type="button"
                  title="Remove photo"
                  onClick={() => onDelete(img.id)}
                >
                  <Trash2 size={11} />
                </DeletePhotoBtn>
              </PhotoControls>
            </PhotoTile>
          );
        })}

        {images.length < wizard.maxImages && (
          <UploadZone>
            <ImagePlus size={24} />
            <span>{uploading ? 'Uploading…' : 'Add photos'}</span>
            <UploadHint>JPG, PNG, or WebP up to 5MB</UploadHint>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={uploading}
              onChange={e => {
                const files = Array.from(e.target.files ?? []);
                if (files.length) handleFiles(files);
                e.target.value = '';
              }}
            />
          </UploadZone>
        )}
      </PhotoGrid>
    </>
  );
}

export function PoliciesStep({ wizard }: { wizard: ServiceWizard }) {
  const { palette } = usePortalPalette();

  const WINDOWS = ['24 hours', '48 hours', '72 hours', '7 days'];

  return (
    <>
      <StepIntro>
        <StepHeading $palette={palette}>Policies</StepHeading>
        <StepLead $palette={palette}>
          Set transparent expectations for setup time, venue requirements, and
          cancellation rules.
        </StepLead>
      </StepIntro>

      <PolicySection>
        <PolicySubhead>Good to know (Practical notes)</PolicySubhead>
        <ListBuilder
          label="Setup & Venue Requirements"
          hint="e.g. Setup requires 3 hours before the event; Venue electricity must be available."
          placeholder="e.g. Venue electricity access must be provided"
          emptyText="No notes added yet."
          items={wizard.goodToKnow}
          onChange={wizard.setGoodToKnow}
        />
      </PolicySection>

      <PolicySection>
        <PolicySubhead>Cancellation policy</PolicySubhead>
        <div>
          <FieldLabel>Free cancellation window</FieldLabel>
          <PolicyWindowSelector>
            {WINDOWS.map(w => (
              <WindowOptionBtn
                key={w}
                type="button"
                $selected={wizard.cancelWindow === w}
                onClick={() => wizard.setCancelWindow(w)}
              >
                Up to {w} before
              </WindowOptionBtn>
            ))}
          </PolicyWindowSelector>
        </div>

        <ListBuilder
          label="Additional cancellation terms"
          hint="State any custom terms plainly."
          placeholder="e.g. Rescheduling permitted once with 48h advance notice"
          emptyText="No additional terms added."
          items={wizard.cancellationPolicy}
          onChange={wizard.setCancellationPolicy}
        />
      </PolicySection>
    </>
  );
}

export function ReviewStep({
  wizard,
  images,
}: {
  wizard: ServiceWizard;
  images: { id: string; image_url: string }[];
}) {
  const { palette } = usePortalPalette();
  const pricing = wizard.authoritativePricing || wizard.pricePreview;
  const coverImage = images[0]?.image_url;

  if (wizard.publishedJustNow) {
    return (
      <SuccessWrap>
        <SuccessIcon>
          <CheckCircle2 size={36} />
        </SuccessIcon>
        <StepIntro>
          <StepHeading $palette={palette}>Service published</StepHeading>
          <StepLead $palette={palette}>
            Your service is now live on EventOK and visible to customers looking
            for decoration.
          </StepLead>
        </StepIntro>
      </SuccessWrap>
    );
  }

  const selectedCategory = wizard.categories.find(
    c => c.id === wizard.categoryId,
  );

  return (
    <>
      <StepIntro>
        <StepHeading $palette={palette}>Review your service</StepHeading>
        <StepLead $palette={palette}>
          Review what customers will see when browsing your service before
          publishing.
        </StepLead>
      </StepIntro>

      <ReviewPreviewWrap>
        {coverImage && (
          <ReviewCover>
            <img src={coverImage} alt={wizard.title} />
          </ReviewCover>
        )}

        {images.length > 1 && (
          <ReviewGallery>
            {images.slice(1).map(img => (
              <ReviewImg key={img.id} src={img.image_url} alt="" />
            ))}
          </ReviewGallery>
        )}

        <ReviewBlock>
          <ReviewLabel>Service title</ReviewLabel>
          <ReviewValue $palette={palette}>
            <ReviewHeadline>
              {wizard.title || 'Untitled service'}
            </ReviewHeadline>
          </ReviewValue>
        </ReviewBlock>

        <ReviewBlock>
          <ReviewLabel>Category</ReviewLabel>
          <ReviewValue $palette={palette}>
            {selectedCategory?.name || 'General decoration'}
          </ReviewValue>
        </ReviewBlock>

        <ReviewBlock>
          <ReviewLabel>Description</ReviewLabel>
          <ReviewValue $palette={palette}>
            {wizard.description || 'No description provided.'}
          </ReviewValue>
        </ReviewBlock>

        <ReviewBlock>
          <ReviewLabel>What's included</ReviewLabel>
          <ReviewValue $palette={palette}>
            {wizard.whatsIncluded.length > 0
              ? wizard.whatsIncluded.map(item => `✓  ${item}`).join('\n')
              : 'No inclusions listed.'}
          </ReviewValue>
        </ReviewBlock>

        <ReviewBlock>
          <ReviewLabel>Cancellation policy</ReviewLabel>
          <ReviewValue $palette={palette}>
            {`Free cancellation up to ${wizard.cancelWindow} before event (${wizard.refundType}).`}
            {wizard.cancellationPolicy.length > 0 &&
              `\n${wizard.cancellationPolicy.join('\n')}`}
          </ReviewValue>
        </ReviewBlock>

        <ReviewPricePanel>
          <ReviewLabel>Customer Pricing Breakdown</ReviewLabel>
          <PriceRow>
            <PriceRowLabel $palette={palette}>Your service price</PriceRowLabel>
            <PriceRowValue>
              ₹{pricing.base.toLocaleString('en-IN')}
            </PriceRowValue>
          </PriceRow>
          <PriceRow>
            <PriceRowLabel $palette={palette}>
              Platform commission (3%)
            </PriceRowLabel>
            <PriceRowValue>
              + ₹{pricing.commission.toLocaleString('en-IN')}
            </PriceRowValue>
          </PriceRow>
          <PriceRow $final>
            <PriceRowLabel $palette={palette}>Customer pays</PriceRowLabel>
            <PriceRowValue $accent>
              ₹{pricing.customerTotal.toLocaleString('en-IN')}
            </PriceRowValue>
          </PriceRow>
          <PriceRow>
            <PriceRowLabel $palette={palette}>
              Advance payment (20%)
            </PriceRowLabel>
            <PriceRowValue>
              ₹{Math.round(pricing.customerTotal * 0.2).toLocaleString('en-IN')}
            </PriceRowValue>
          </PriceRow>
          <PriceRow>
            <PriceRowLabel $palette={palette}>Remaining at event</PriceRowLabel>
            <PriceRowValue>
              ₹
              {(
                pricing.customerTotal - Math.round(pricing.customerTotal * 0.2)
              ).toLocaleString('en-IN')}
            </PriceRowValue>
          </PriceRow>
          <EstimateNote>
            Zero platform commission on add-ons. Full transparency for both you
            and your customer.
          </EstimateNote>
        </ReviewPricePanel>
      </ReviewPreviewWrap>
    </>
  );
}
