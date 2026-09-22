import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { useListBuilder } from './helper';
import {
  AddButton,
  AddInput,
  AddRow,
  Bullet,
  Empty,
  Hint,
  Label,
  List,
  RemoveButton,
  Row,
  RowButton,
  RowInput,
  Wrap,
} from './styled';

interface ListBuilderProps {
  label: string;
  hint: string;
  placeholder: string;
  emptyText: string;
  items: string[];
  onChange: (next: string[]) => void;
}

/** Free-text list: type a line, press + (or Enter), reorder or edit any line after. */
export function ListBuilder({
  label,
  hint,
  placeholder,
  emptyText,
  items,
  onChange,
}: ListBuilderProps) {
  const builder = useListBuilder({ items, onChange });

  return (
    <Wrap>
      <Label>{label}</Label>
      <Hint>
        {builder.isDuplicate
          ? `“${builder.draft.trim()}” is already in the list`
          : hint}
      </Hint>

      <AddRow>
        <AddInput
          value={builder.draft}
          onChange={event => builder.setDraft(event.target.value)}
          onKeyDown={builder.onAddKeyDown}
          placeholder={placeholder}
          aria-label={label}
        />
        <AddButton
          type="button"
          onClick={builder.add}
          disabled={!builder.canAdd}
          aria-label={`Add to ${label}`}
        >
          <Plus size={18} strokeWidth={2.6} />
        </AddButton>
      </AddRow>

      {items.length === 0 ? (
        <Empty>{emptyText}</Empty>
      ) : (
        <List>
          {items.map((item, index) => (
            <Row key={`${index}-${item}`}>
              <Bullet>{index + 1}</Bullet>
              <RowInput
                value={item}
                onChange={event => builder.update(index, event.target.value)}
                onBlur={() => builder.commit(index)}
                aria-label={`${label} line ${index + 1}`}
              />
              <RowButton
                type="button"
                onClick={() => builder.move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
              >
                <ChevronUp size={15} />
              </RowButton>
              <RowButton
                type="button"
                onClick={() => builder.move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Move down"
              >
                <ChevronDown size={15} />
              </RowButton>
              <RemoveButton
                type="button"
                onClick={() => builder.remove(index)}
                aria-label="Remove line"
              >
                <Trash2 size={15} />
              </RemoveButton>
            </Row>
          ))}
        </List>
      )}
    </Wrap>
  );
}
