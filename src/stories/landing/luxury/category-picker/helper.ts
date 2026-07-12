import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { photography } from '@/design-system/tokens/photography';

export const eventTypes = [
  {
    slug: 'wedding',
    labelKey: 'landing.categoryWedding',
    image: photography.weddings[1],
  },
  {
    slug: 'corporate',
    labelKey: 'landing.categoryCorporate',
    image: photography.corporate[0],
  },
  {
    slug: 'birthday',
    labelKey: 'landing.categoryBirthday',
    image: photography.birthdays[0],
  },
] as const;

export function useLuxuryCategoryPicker() {
  const navigate = useNavigate();

  const goToCategory = (slug: string) => {
    navigate(`${ROUTES.SERVICES}?type=${slug}`);
  };

  return { goToCategory };
}
