import { useState } from 'react';
import { Input, Button, Tag } from 'antd';
import { Search, ChevronDown, ChevronUp, MapPin, Users } from 'lucide-react';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminLocations } from './helper';
import {
  Page,
  HeaderSection,
  HeaderLeft,
  HeaderEyebrow,
  HeaderTitle,
  HeaderSubtitle,
  MetricsRow,
  MetricTile,
  MetricLabel,
  MetricValue,
  ControlsBar,
  StateList,
  StateItem,
  StateHeader,
  StateHeaderLeft,
  StateName,
  StateHeaderRight,
  CityGrid,
  CityCard,
  CityName,
  VendorBadge,
} from './styled';

export default function AdminLocationsPage() {
  const { searchTerm, setSearchTerm, states, metrics, isLoading } =
    useAdminLocations();
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>(
    {},
  );

  if (isLoading) return <LoadingState />;

  const toggleExpand = (stateId: string) => {
    setExpandedStates(prev => ({
      ...prev,
      [stateId]: !prev[stateId],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    states.forEach(s => {
      allExpanded[s.id] = true;
    });
    setExpandedStates(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedStates({});
  };

  return (
    <Page>
      <HeaderSection>
        <HeaderLeft>
          <HeaderEyebrow>MARKETPLACE INFRASTRUCTURE</HeaderEyebrow>
          <HeaderTitle>Operating Service Locations</HeaderTitle>
          <HeaderSubtitle>
            Geographic coverage and active vendor density across states and
            cities.
          </HeaderSubtitle>
        </HeaderLeft>
      </HeaderSection>

      <MetricsRow>
        <MetricTile>
          <MetricLabel>Covered States / UTs</MetricLabel>
          <MetricValue>{metrics.totalStates}</MetricValue>
        </MetricTile>
        <MetricTile>
          <MetricLabel>Registered Cities</MetricLabel>
          <MetricValue>{metrics.totalCities}</MetricValue>
        </MetricTile>
        <MetricTile>
          <MetricLabel>Active Operating States</MetricLabel>
          <MetricValue style={{ color: '#2563eb' }}>
            {metrics.activeStatesWithVendors}
          </MetricValue>
        </MetricTile>
        <MetricTile>
          <MetricLabel>Total Vendor Deployments</MetricLabel>
          <MetricValue style={{ color: '#059669' }}>
            {metrics.totalVendors}
          </MetricValue>
        </MetricTile>
      </MetricsRow>

      <ControlsBar>
        <Input
          placeholder="Search state or city name..."
          prefix={<Search size={16} color="#94a3b8" />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: 320 }}
          allowClear
        />

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="small" onClick={handleExpandAll}>
            Expand All
          </Button>
          <Button size="small" onClick={handleCollapseAll}>
            Collapse All
          </Button>
        </div>
      </ControlsBar>

      <StateList>
        {states.length > 0 ? (
          states.map(state => {
            const isExpanded =
              !!expandedStates[state.id] || !!searchTerm.trim();

            return (
              <StateItem key={state.id}>
                <StateHeader
                  $expanded={isExpanded}
                  onClick={() => toggleExpand(state.id)}
                >
                  <StateHeaderLeft>
                    <MapPin size={16} color="#64748b" />
                    <StateName>{state.name}</StateName>
                    <Tag>{state.cities.length} cities</Tag>
                  </StateHeaderLeft>

                  <StateHeaderRight>
                    <VendorBadge $count={state.total_vendors}>
                      <Users
                        size={12}
                        style={{ display: 'inline', marginRight: 4 }}
                      />
                      {state.total_vendors}{' '}
                      {state.total_vendors === 1 ? 'vendor' : 'vendors'}
                    </VendorBadge>
                    {isExpanded ? (
                      <ChevronUp size={16} color="#64748b" />
                    ) : (
                      <ChevronDown size={16} color="#64748b" />
                    )}
                  </StateHeaderRight>
                </StateHeader>

                {isExpanded && (
                  <CityGrid>
                    {state.cities.map(city => (
                      <CityCard key={city.id}>
                        <CityName>{city.name}</CityName>
                        <VendorBadge $count={city.vendor_count}>
                          {city.vendor_count}{' '}
                          {city.vendor_count === 1 ? 'vendor' : 'vendors'}
                        </VendorBadge>
                      </CityCard>
                    ))}
                  </CityGrid>
                )}
              </StateItem>
            );
          })
        ) : (
          <div
            style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#94a3b8',
              background: '#ffffff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
            }}
          >
            No states or cities matched "{searchTerm}"
          </div>
        )}
      </StateList>
    </Page>
  );
}
