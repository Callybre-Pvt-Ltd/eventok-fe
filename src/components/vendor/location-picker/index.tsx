import { Button, Checkbox, Input, Select } from 'antd';
import { Search, X } from 'lucide-react';
import { useLocationPicker } from './helper';
import {
  CityGrid,
  CityPill,
  CityPillList,
  ControlsRow,
  EmptyCities,
  RemoveStateBtn,
  SelectionToolbar,
  StateCityCount,
  StateCoverageHeader,
  StateCoverageItem,
  StateCoverageList,
  SummarySection,
  SummaryTitle,
  Wrap,
} from './styled';

interface LocationPickerProps {
  vendorId: string;
}

export function LocationPicker({ vendorId }: LocationPickerProps) {
  const {
    states,
    selectedStateId,
    setSelectedStateId,
    cities,
    allCitiesInCurrentState,
    selectedCityIds,
    toggleCity,
    removeCity,
    citySearch,
    setCitySearch,
    allCurrentStateSelected,
    toggleAllCurrentState,
    removeStateCities,
    groupedCoverage,
    isCitiesLoading,
    saveMutation,
  } = useLocationPicker(vendorId);

  const selectedState = states.find(s => s.id === selectedStateId);

  return (
    <Wrap>
      <ControlsRow>
        <Select
          value={selectedStateId || undefined}
          onChange={setSelectedStateId}
          placeholder="Select state"
          style={{ minWidth: 220, flex: 1 }}
          options={states.map(s => ({ value: s.id, label: s.name }))}
          showSearch
          filterOption={(input, opt) =>
            (opt?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
        <Input
          placeholder="Search cities in state…"
          prefix={<Search size={14} color="#94a3b8" />}
          value={citySearch}
          onChange={e => setCitySearch(e.target.value)}
          allowClear
          style={{ flex: 1 }}
        />
      </ControlsRow>

      {selectedState && (
        <SelectionToolbar>
          <span>
            {selectedState.name} ({cities.length} available)
          </span>
          {allCitiesInCurrentState.length > 0 && (
            <Button
              type="link"
              size="small"
              onClick={toggleAllCurrentState}
              style={{ padding: 0 }}
            >
              {allCurrentStateSelected
                ? 'Deselect all in state'
                : 'Select all in state'}
            </Button>
          )}
        </SelectionToolbar>
      )}

      <CityGrid>
        {isCitiesLoading ? (
          <EmptyCities>Loading cities…</EmptyCities>
        ) : cities.length === 0 ? (
          <EmptyCities>
            {citySearch
              ? `No cities match "${citySearch}"`
              : 'Select a state to view cities'}
          </EmptyCities>
        ) : (
          cities.map(city => (
            <Checkbox
              key={city.id}
              checked={selectedCityIds.includes(city.id)}
              onChange={() => toggleCity(city.id)}
            >
              {city.name}
            </Checkbox>
          ))
        )}
      </CityGrid>

      {groupedCoverage.length > 0 && (
        <SummarySection>
          <SummaryTitle>
            Active coverage ({selectedCityIds.length} cities selected)
          </SummaryTitle>
          <StateCoverageList>
            {groupedCoverage.map(group => (
              <StateCoverageItem key={group.stateId}>
                <StateCoverageHeader>
                  <div>
                    <strong>{group.stateName}</strong>
                    <StateCityCount>
                      {group.count} {group.count === 1 ? 'city' : 'cities'}
                    </StateCityCount>
                  </div>
                  <RemoveStateBtn
                    type="button"
                    onClick={() => removeStateCities(group.stateId)}
                  >
                    Clear state
                  </RemoveStateBtn>
                </StateCoverageHeader>
                <CityPillList>
                  {group.cities.map(c => (
                    <CityPill key={c.cityId}>
                      {c.cityName}
                      <button
                        type="button"
                        aria-label={`Remove ${c.cityName}`}
                        onClick={() => removeCity(c.cityId)}
                      >
                        <X size={12} />
                      </button>
                    </CityPill>
                  ))}
                </CityPillList>
              </StateCoverageItem>
            ))}
          </StateCoverageList>
        </SummarySection>
      )}

      <div>
        <Button
          type="primary"
          loading={saveMutation.isPending}
          onClick={() => saveMutation.mutate()}
        >
          Save locations
        </Button>
      </div>
    </Wrap>
  );
}
