/** Static EventOK decoration service categories — source of truth for vendor create + filters. */
export interface DecorationCategory {
  slug: string;
  name: string;
  icon: string;
  blurb: string;
}

export const DECORATION_CATEGORIES: readonly DecorationCategory[] = [
  {
    slug: 'wedding-decorations',
    name: 'Wedding Decorations',
    icon: 'Gem',
    blurb: 'Mandap, floral, stage & reception décor',
  },
  {
    slug: 'birthday-decorations',
    name: 'Birthday Decorations',
    icon: 'Cake',
    blurb: 'Themes, balloons, cake table & kids parties',
  },
  {
    slug: 'engagement-decor',
    name: 'Engagement & Ring Ceremony',
    icon: 'Heart',
    blurb: 'Intimate décor for engagements & proposals',
  },
  {
    slug: 'haldi-mehendi',
    name: 'Haldi & Mehendi',
    icon: 'Flower2',
    blurb: 'Colourful setups, seating & photo corners',
  },
  {
    slug: 'baby-shower',
    name: 'Baby Shower & Naming',
    icon: 'Baby',
    blurb: 'Soft themes, welcome boards & props',
  },
  {
    slug: 'anniversary-decor',
    name: 'Anniversary Decor',
    icon: 'Sparkles',
    blurb: 'Romantic room, dinner & surprise setups',
  },
  {
    slug: 'corporate-events',
    name: 'Corporate & Office Events',
    icon: 'Building2',
    blurb: 'Brand activations, launches & office parties',
  },
  {
    slug: 'stage-backdrop',
    name: 'Stage & Backdrop',
    icon: 'Clapperboard',
    blurb: 'LED walls, drapes, truss & centrepieces',
  },
  {
    slug: 'floral-decor',
    name: 'Floral Decor',
    icon: 'Flower',
    blurb: 'Fresh & artificial florals, garlands, centrepieces',
  },
  {
    slug: 'balloon-decor',
    name: 'Balloon Decor',
    icon: 'PartyPopper',
    blurb: 'Arches, organic garlands, balloon walls',
  },
  {
    slug: 'lighting-ambiance',
    name: 'Lighting & Ambiance',
    icon: 'Lightbulb',
    blurb: 'Serial lights, spotlights, cold pyro & mood',
  },
  {
    slug: 'entrance-welcome',
    name: 'Entrance & Welcome Gate',
    icon: 'DoorOpen',
    blurb: 'Gates, pathways, welcome boards',
  },
  {
    slug: 'tent-outdoor',
    name: 'Tent & Outdoor Setup',
    icon: 'Tent',
    blurb: 'Shamiana, flooring, outdoor seating',
  },
  {
    slug: 'theme-parties',
    name: 'Theme Parties',
    icon: 'Palette',
    blurb: 'Custom themes for all ages & occasions',
  },
  {
    slug: 'photography-setup',
    name: 'Photo Booth & Props',
    icon: 'Camera',
    blurb: 'Booths, props, selfie corners',
  },
  {
    slug: 'home-decoration',
    name: 'Home Decoration',
    icon: 'Home',
    blurb: 'House warming, festivals & room décor',
  },
] as const;

export const INDIA_STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const;

export const SERVICE_CITIES = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Chandigarh',
  'Indore',
  'Surat',
  'Noida',
  'Gurgaon',
  'Nangloi',
] as const;
