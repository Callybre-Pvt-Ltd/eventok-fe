import { CheckCircle2, Star } from 'lucide-react';
import {
  ClientCity,
  ClientMeta,
  ClientName,
  ClientRow,
  EventTag,
  Eyebrow,
  RatingRow,
  StoriesGrid,
  StoriesHeader,
  StoriesInner,
  StoriesSection,
  StoryBody,
  StoryCard,
  StoryMedia,
  StoryQuote,
  Subtitle,
  Title,
  VerifiedBadge,
} from './styled';

const STORIES = [
  {
    name: 'Ananya & Kabir S.',
    city: 'South Delhi',
    event: 'Wedding Reception • 250 Guests',
    quote:
      'The mandap and stage flowers were breathtaking. EventOK matched us with a local decorator who arrived exactly at 7 AM and finished before guests arrived. Flawless execution!',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Rohan Sharma',
    city: 'Gurugram',
    event: '1st Birthday Celebration',
    quote:
      'Used the package builder to customize a pastel safari balloon arch. Transparent pricing with no last-minute charges. The kids were thrilled and photos looked stunning.',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Meera Deshmukh',
    city: 'Bandra, Mumbai',
    event: '25th Anniversary Dinner',
    quote:
      'Booked a fairy light canopy with floral centerpiece. The decorator was polite, verified, and cleaned everything up afterwards. Will definitely book again!',
    img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
  },
];

export function VerifiedStories() {
  return (
    <StoriesSection>
      <StoriesInner>
        <StoriesHeader>
          <Eyebrow>Real Experiences</Eyebrow>
          <Title>Loved by Event Hosts Across India</Title>
          <Subtitle>
            Over 12,000+ happy celebrations styled with 100% verified decorator
            partners.
          </Subtitle>
        </StoriesHeader>

        <StoriesGrid>
          {STORIES.map(story => (
            <StoryCard key={story.name}>
              <StoryMedia>
                <img src={story.img} alt={story.event} loading="lazy" />
                <EventTag>{story.event}</EventTag>
              </StoryMedia>
              <StoryBody>
                <RatingRow>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </RatingRow>
                <StoryQuote>&ldquo;{story.quote}&rdquo;</StoryQuote>
                <ClientRow>
                  <ClientMeta>
                    <ClientName>{story.name}</ClientName>
                    <ClientCity>{story.city}</ClientCity>
                  </ClientMeta>
                  <VerifiedBadge>
                    <CheckCircle2 size={13} /> Verified Booking
                  </VerifiedBadge>
                </ClientRow>
              </StoryBody>
            </StoryCard>
          ))}
        </StoriesGrid>
      </StoriesInner>
    </StoriesSection>
  );
}
