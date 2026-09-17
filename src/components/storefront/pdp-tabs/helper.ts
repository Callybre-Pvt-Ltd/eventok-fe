import { useState } from 'react';
import { PDP_TABS, type PdpTab } from '@/constants/catalog';

const TAB_LABELS: Record<PdpTab, string> = {
  whatsIncluded: 'storefront.pdpTabIncluded',
  goodToKnow: 'storefront.pdpTabGoodToKnow',
  aboutExperience: 'storefront.pdpTabExperience',
  cancellationPolicy: 'storefront.pdpTabCancellation',
};

export function usePdpTabs() {
  const [tab, setTab] = useState<PdpTab>('whatsIncluded');
  return { tab, setTab, tabs: PDP_TABS, labels: TAB_LABELS };
}
