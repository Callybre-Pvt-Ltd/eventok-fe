import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Building2,
  Camera,
  Cake,
  Clapperboard,
  DoorOpen,
  Flower,
  Flower2,
  Gem,
  Heart,
  Home,
  ImagePlus,
  Lightbulb,
  Palette,
  PartyPopper,
  Plus,
  Sparkles,
  Pencil,
  Tent,
  Trash2,
  Baby,
  type LucideIcon,
} from 'lucide-react';
import { LoadingState } from '@/components/global/loading-state';
import { brandColors } from '@/theme/brand';
import { INDIA_STATES, SERVICE_CITIES } from '@/constants/decorationCategories';
import { MAX_SERVICE_IMAGES } from '@/constants/servicePresets';
import { ListBuilder } from '@/components/vendor/list-builder';
import { useVendorServices } from './helper';
import {
  CardActions,
  CatBlurb,
  CategoryGrid,
  CategoryTile,
  CatName,
  ChipSection,
  Composer,
  CountHint,
  CountryLock,
  DangerBtn,
  EmptyBlock,
  Field,
  FieldGrid,
  FileLabel,
  FormActions,
  GhostBtn,
  Hero,
  HeroEyebrow,
  HeroLead,
  HeroTitle,
  ImagePreview,
  ImagePreviewGrid,
  Meta,
  Page,
  Price,
  PrimaryBtn,
  SectionHint,
  SectionLabel,
  ServiceCard,
  ServiceGrid,
  ServiceTitle,
  ServiceTop,
  StatusPill,
  Toolbar,
  WarnBanner,
} from './styled';

const ICONS: Record<string, LucideIcon> = {
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

export default function VendorServicesPage() {
  const {
    services,
    categories,
    categoriesReady,
    isLoading,
    createMutation,
    updateMutation,
    publishMutation,
    deleteMutation,
    uploadMutation,
    vendorCity,
  } = useVendorServices();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('Delhi');
  const [state, setState] = useState('Delhi');
  const [whatsIncluded, setWhatsIncluded] = useState<string[]>([]);
  const [goodToKnow, setGoodToKnow] = useState<string[]>([]);
  const [cancellation, setCancellation] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (vendorCity) setCity(vendorCity);
  }, [vendorCity]);

  useEffect(() => {
    const urls = images.map(file => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [images]);

  const selected = useMemo(
    () => categories.find(c => c.id === categoryId || c.slug === categoryId),
    [categories, categoryId],
  );

  if (isLoading) return <LoadingState />;

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setPrice('');
    setDescription('');
    setCategoryId('');
    setWhatsIncluded([]);
    setGoodToKnow([]);
    setCancellation([]);
    setImages([]);
  };

  const startEdit = (service: (typeof services)[number]) => {
    const raw = service.description ?? '';
    const withoutArea = raw.split(/\n\nService area:/)[0];
    setEditingId(service.id);
    setCategoryId(service.category_id ?? '');
    setTitle(service.title);
    setPrice(String(service.starting_price ?? ''));
    setDescription(withoutArea === raw ? '' : withoutArea);
    setWhatsIncluded(service.whats_included ?? []);
    setGoodToKnow(service.good_to_know ?? []);
    setCancellation(service.cancellation_policy ?? []);
    setImages([]);
    setOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const starting_price = Number(price);
    if (!selected?.id || !title.trim() || !starting_price || !city || !state) {
      return;
    }
    if (editingId) {
      updateMutation.mutate(
        {
          serviceId: editingId,
          category_id: selected.id,
          title: title.trim(),
          description: description.trim() || undefined,
          starting_price,
          city,
          state,
          whats_included: whatsIncluded,
          good_to_know: goodToKnow,
          cancellation_policy: cancellation,
          images,
        },
        {
          onSuccess: () => {
            resetForm();
            setOpen(false);
          },
        },
      );
      return;
    }
    if (!images.length) return;
    createMutation.mutate(
      {
        category_id: selected.id,
        title: title.trim(),
        description: description.trim() || undefined,
        starting_price,
        city,
        state,
        whats_included: whatsIncluded,
        good_to_know: goodToKnow,
        cancellation_policy: cancellation,
        images,
      },
      {
        onSuccess: () => {
          resetForm();
          setOpen(false);
        },
      },
    );
  };

  return (
    <Page>
      <Hero>
        <HeroEyebrow>Vendor workspace</HeroEyebrow>
        <HeroTitle>Your decoration services</HeroTitle>
        <HeroLead>
          Tap common options, add your own notes, and upload real photos of the
          setup. New services publish automatically so customers can book them
          on the shop.
        </HeroLead>
      </Hero>

      <Toolbar>
        <CountHint>
          {services.length === 0
            ? 'No services yet'
            : `${services.length} service${services.length === 1 ? '' : 's'}`}
        </CountHint>
        <PrimaryBtn
          type="button"
          onClick={() => {
            if (open) resetForm();
            setOpen(v => !v);
          }}
        >
          <Plus size={16} strokeWidth={2.4} />
          {open ? 'Close form' : 'Add service'}
        </PrimaryBtn>
      </Toolbar>

      {open ? (
        <Composer>
          <SectionLabel>
            {editingId ? 'Edit service' : 'New service'}
          </SectionLabel>
          <SectionHint>
            {editingId
              ? `Change any detail and save. Existing photos stay; anything you add here is appended (up to ${MAX_SERVICE_IMAGES}).`
              : `Pick a category, price, service area, then customise inclusions and upload photos (up to ${MAX_SERVICE_IMAGES}).`}
          </SectionHint>

          {!categoriesReady ? (
            <WarnBanner>
              Decoration categories are not synced from the API yet. Ask an
              admin to open Admin → Categories once (that creates them), or run{' '}
              <code>just seed-demo</code> on the backend.
            </WarnBanner>
          ) : null}

          <CategoryGrid>
            {categories.map(cat => {
              const Icon = ICONS[cat.icon] ?? Sparkles;
              const active =
                categoryId === cat.id ||
                (categoryId === cat.slug && !cat.id) ||
                selected?.slug === cat.slug;
              return (
                <CategoryTile
                  key={cat.slug || cat.id}
                  type="button"
                  $active={Boolean(active)}
                  onClick={() => setCategoryId(cat.id || cat.slug)}
                >
                  <Icon size={18} strokeWidth={1.75} color={brandColors.gold} />
                  <CatName>{cat.name}</CatName>
                  <CatBlurb>{cat.description || 'Decoration service'}</CatBlurb>
                </CategoryTile>
              );
            })}
          </CategoryGrid>

          <form onSubmit={onSubmit}>
            <FieldGrid>
              <Field className="span-2">
                Service title
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Mandap & stage floral package"
                  required
                />
              </Field>
              <Field>
                Starting price (₹)
                <input
                  type="number"
                  min={1}
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="25000"
                  required
                />
              </Field>
              <Field>
                City
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  required
                >
                  {SERVICE_CITIES.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field>
                State
                <select
                  value={state}
                  onChange={e => setState(e.target.value)}
                  required
                >
                  {INDIA_STATES.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field>
                Country
                <CountryLock>India</CountryLock>
              </Field>
              <Field className="span-2">
                About this experience
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Short pitch customers read on the product page…"
                />
              </Field>
            </FieldGrid>

            <ListBuilder
              label="What's included"
              hint="One line per inclusion. These appear under What's Included on your listing."
              placeholder="e.g. Complete theme & colour setup"
              emptyText="Nothing added yet — type an inclusion above and press +."
              items={whatsIncluded}
              onChange={setWhatsIncluded}
            />
            <ListBuilder
              label="Good to know"
              hint="Practical notes the customer should read before booking."
              placeholder="e.g. Setup needs 3 hours before the event"
              emptyText="Nothing added yet — type a note above and press +."
              items={goodToKnow}
              onChange={setGoodToKnow}
            />
            <ListBuilder
              label="Cancellation policy"
              hint="State your terms plainly, one rule per line."
              placeholder="e.g. Free cancellation up to 48 hours before"
              emptyText="Nothing added yet — type a rule above and press +."
              items={cancellation}
              onChange={setCancellation}
            />

            <ChipSection>
              <SectionLabel>Photos</SectionLabel>
              <SectionHint>
                Real photos only — no stock placeholders on the shop. Upload up
                to {MAX_SERVICE_IMAGES} images (JPEG / PNG / WebP).
              </SectionHint>
              <FileLabel>
                <ImagePlus size={14} />
                {images.length
                  ? `Add more (${images.length}/${MAX_SERVICE_IMAGES})`
                  : 'Upload photos'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={e => {
                    const next = Array.from(e.target.files ?? []);
                    setImages(prev =>
                      [...prev, ...next].slice(0, MAX_SERVICE_IMAGES),
                    );
                    e.target.value = '';
                  }}
                />
              </FileLabel>
              {previews.length ? (
                <ImagePreviewGrid>
                  {previews.map((src, index) => (
                    <ImagePreview key={`${src}-${index}`}>
                      <img src={src} alt="" />
                      <button
                        type="button"
                        aria-label="Remove photo"
                        onClick={() =>
                          setImages(prev => prev.filter((_, i) => i !== index))
                        }
                      >
                        ×
                      </button>
                    </ImagePreview>
                  ))}
                </ImagePreviewGrid>
              ) : (
                <SectionHint>At least one photo is required.</SectionHint>
              )}
            </ChipSection>

            <FormActions>
              <PrimaryBtn
                type="submit"
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  !categoriesReady ||
                  (!editingId && !images.length)
                }
              >
                {editingId
                  ? updateMutation.isPending
                    ? 'Saving…'
                    : 'Save changes'
                  : createMutation.isPending
                  ? 'Publishing…'
                  : 'Create & publish'}
              </PrimaryBtn>
              <GhostBtn
                type="button"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </GhostBtn>
            </FormActions>
          </form>
        </Composer>
      ) : null}

      {services.length === 0 ? (
        <EmptyBlock>
          <h3>List your first decoration service</h3>
          <p>
            Customers discover it under Shop and book for their event date —
            with your real photos and clear packaging.
          </p>
          <PrimaryBtn type="button" onClick={() => setOpen(true)}>
            <Plus size={16} /> Add service
          </PrimaryBtn>
        </EmptyBlock>
      ) : (
        <ServiceGrid>
          {services.map(s => {
            const cat = categories.find(c => c.id === s.category_id);
            const live = s.status === 'PUBLISHED';
            return (
              <ServiceCard key={s.id}>
                <ServiceTop>
                  <ServiceTitle>{s.title}</ServiceTitle>
                  <StatusPill $live={live}>
                    {live ? 'Live' : s.status.replace(/_/g, ' ')}
                  </StatusPill>
                </ServiceTop>
                <Price>
                  ₹{Number(s.starting_price).toLocaleString('en-IN')}
                  <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                    {' '}
                    starting
                  </span>
                </Price>
                <Meta>
                  {cat?.name ? `${cat.name}\n` : ''}
                  {(s.whats_included?.length
                    ? `${s.whats_included.length} inclusions · `
                    : '') + (s.description || 'No about text yet')}
                </Meta>
                <CardActions>
                  <GhostBtn type="button" onClick={() => startEdit(s)}>
                    <Pencil size={14} />
                    Edit
                  </GhostBtn>
                  {!live ? (
                    <PrimaryBtn
                      type="button"
                      onClick={() => publishMutation.mutate(s.id)}
                      disabled={publishMutation.isPending}
                    >
                      Publish
                    </PrimaryBtn>
                  ) : null}
                  <FileLabel>
                    <ImagePlus size={14} />
                    Add photos
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={e => {
                        const files = Array.from(e.target.files ?? []);
                        if (files.length) {
                          uploadMutation.mutate({ serviceId: s.id, files });
                        }
                        e.target.value = '';
                      }}
                    />
                  </FileLabel>
                  <DangerBtn
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete “${s.title}”?`)) {
                        deleteMutation.mutate(s.id);
                      }
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </DangerBtn>
                </CardActions>
              </ServiceCard>
            );
          })}
        </ServiceGrid>
      )}
    </Page>
  );
}
