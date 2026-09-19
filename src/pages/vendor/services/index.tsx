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
  Tent,
  Trash2,
  Baby,
  type LucideIcon,
} from 'lucide-react';
import { LoadingState } from '@/components/global/loading-state';
import { brandColors } from '@/theme/brand';
import {
  INDIA_STATES,
  SERVICE_CITIES,
} from '@/constants/decorationCategories';
import { useVendorServices } from './helper';
import {
  CardActions,
  CatBlurb,
  CategoryGrid,
  CategoryTile,
  CatName,
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
    publishMutation,
    deleteMutation,
    uploadMutation,
    vendorCity,
  } = useVendorServices();

  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('Delhi');
  const [state, setState] = useState('Delhi');

  useEffect(() => {
    if (vendorCity) setCity(vendorCity);
  }, [vendorCity]);

  const selected = useMemo(
    () => categories.find(c => c.id === categoryId || c.slug === categoryId),
    [categories, categoryId],
  );

  if (isLoading) return <LoadingState />;

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setCategoryId('');
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const starting_price = Number(price);
    if (!selected?.id || !title.trim() || !starting_price || !city || !state) {
      return;
    }
    createMutation.mutate(
      {
        category_id: selected.id,
        title: title.trim(),
        description: description.trim() || undefined,
        starting_price,
        city,
        state,
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
          Pick a decoration category, set the city you cover, and add photos.
          New services publish automatically so customers can book them on the
          shop.
        </HeroLead>
      </Hero>

      <Toolbar>
        <CountHint>
          {services.length === 0
            ? 'No services yet'
            : `${services.length} service${services.length === 1 ? '' : 's'}`}
        </CountHint>
        <PrimaryBtn type="button" onClick={() => setOpen(v => !v)}>
          <Plus size={16} strokeWidth={2.4} />
          {open ? 'Close form' : 'Add service'}
        </PrimaryBtn>
      </Toolbar>

      {open ? (
        <Composer>
          <SectionLabel>New service</SectionLabel>
          <SectionHint>
            Choose one static decoration category, then fill pricing and service
            area (country is always India).
          </SectionHint>

          {!categoriesReady ? (
            <WarnBanner>
              Decoration categories are not synced from the API yet. Ask an
              admin to open Admin → Categories once (that creates them), or run{' '}
              <code>just seed-demo</code> on the backend. You can still preview
              the category list below.
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
                  <Icon
                    size={18}
                    strokeWidth={1.75}
                    color={brandColors.gold}
                  />
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
                Description
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="What's included, guest capacity, setup time…"
                />
              </Field>
            </FieldGrid>
            <FormActions>
              <PrimaryBtn
                type="submit"
                disabled={createMutation.isPending || !categoriesReady}
              >
                {createMutation.isPending ? 'Creating…' : 'Create service'}
              </PrimaryBtn>
              <GhostBtn type="button" onClick={() => setOpen(false)}>
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
            Customers will discover it under Browse Services and request a
            booking for their event date — no quantity steppers.
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
                  {s.description || 'No description yet'}
                </Meta>
                <CardActions>
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
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          uploadMutation.mutate({ serviceId: s.id, file });
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
