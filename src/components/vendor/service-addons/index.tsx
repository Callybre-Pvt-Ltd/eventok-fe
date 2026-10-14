import { Button, Input, InputNumber, Switch } from 'antd';
import { Plus, Trash2 } from 'lucide-react';
import { useServiceAddons } from './helper';
import {
  AddForm,
  AddFormRow,
  AddonActions,
  AddonDesc,
  AddonInfo,
  AddonList,
  AddonName,
  AddonPrice,
  AddonRow,
  CommissionNotice,
  EmptyAddons,
  RemoveBtn,
  Wrap,
} from './styled';

interface ServiceAddonsProps {
  serviceId: string;
}

export function ServiceAddons({ serviceId }: ServiceAddonsProps) {
  const {
    addons,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    createMutation,
    toggleMutation,
    deleteMutation,
    canSubmit,
  } = useServiceAddons(serviceId);

  return (
    <Wrap>
      <CommissionNotice>
        <strong>Zero platform commission on add-ons:</strong> 100% of the add-on
        price is paid by the customer directly to your earnings. Platform
        commission applies strictly to the base service price.
      </CommissionNotice>

      {addons.length === 0 ? (
        <EmptyAddons>
          No extras added yet. Use the form below to offer optional items (e.g.
          extra balloons, cake table backdrop, special lighting).
        </EmptyAddons>
      ) : (
        <AddonList>
          {addons.map(addon => (
            <AddonRow key={addon.id}>
              <AddonInfo>
                <AddonName $inactive={!addon.is_active}>{addon.name}</AddonName>
                {addon.description && (
                  <AddonDesc>{addon.description}</AddonDesc>
                )}
              </AddonInfo>
              <AddonPrice>
                ₹{Number(addon.price).toLocaleString('en-IN')}
              </AddonPrice>
              <AddonActions>
                <Switch
                  size="small"
                  checked={addon.is_active}
                  loading={toggleMutation.isPending}
                  onChange={checked =>
                    toggleMutation.mutate({
                      addonId: addon.id,
                      isActive: checked,
                    })
                  }
                  title={addon.is_active ? 'Active' : 'Paused'}
                />
                <RemoveBtn
                  type="button"
                  aria-label="Remove add-on"
                  onClick={() => {
                    if (window.confirm(`Remove add-on "${addon.name}"?`)) {
                      deleteMutation.mutate(addon.id);
                    }
                  }}
                >
                  <Trash2 size={14} />
                </RemoveBtn>
              </AddonActions>
            </AddonRow>
          ))}
        </AddonList>
      )}

      <AddForm>
        <AddFormRow>
          <Input
            placeholder="Add-on name (e.g. 10 Extra Balloons)"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ flex: 2 }}
          />
          <InputNumber
            placeholder="Price"
            value={price ? Number(price) : undefined}
            onChange={v => setPrice(v ? String(v) : '')}
            style={{ flex: 1, minWidth: 110 }}
            min={1}
            prefix="₹"
          />
          <Button
            type="primary"
            icon={<Plus size={14} />}
            disabled={!canSubmit}
            loading={createMutation.isPending}
            onClick={() => createMutation.mutate()}
          >
            Add extra
          </Button>
        </AddFormRow>
        <Input
          placeholder="Optional short description (e.g. Metallic chrome finish)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          size="small"
        />
      </AddForm>
    </Wrap>
  );
}
