import { useCallback, useState, type KeyboardEvent } from 'react';

interface UseListBuilderArgs {
  items: string[];
  onChange: (next: string[]) => void;
}

export function useListBuilder({ items, onChange }: UseListBuilderArgs) {
  const [draft, setDraft] = useState('');

  const trimmed = draft.trim();
  const isDuplicate = items.some(
    item => item.toLowerCase() === trimmed.toLowerCase(),
  );
  const canAdd = trimmed.length > 0 && !isDuplicate;

  const add = useCallback(() => {
    if (!canAdd) return;
    onChange([...items, trimmed]);
    setDraft('');
  }, [canAdd, items, onChange, trimmed]);

  const onAddKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      add();
    },
    [add],
  );

  /** Editing a line in place; an emptied line is removed when it loses focus. */
  const update = useCallback(
    (index: number, value: string) => {
      onChange(items.map((item, i) => (i === index ? value : item)));
    },
    [items, onChange],
  );

  const remove = useCallback(
    (index: number) => onChange(items.filter((_, i) => i !== index)),
    [items, onChange],
  );

  const commit = useCallback(
    (index: number) => {
      if (items[index]?.trim()) return;
      remove(index);
    },
    [items, remove],
  );

  const move = useCallback(
    (index: number, direction: -1 | 1) => {
      const target = index + direction;
      if (target < 0 || target >= items.length) return;
      const next = [...items];
      [next[index], next[target]] = [next[target], next[index]];
      onChange(next);
    },
    [items, onChange],
  );

  return {
    draft,
    setDraft,
    canAdd,
    isDuplicate: trimmed.length > 0 && isDuplicate,
    add,
    onAddKeyDown,
    update,
    remove,
    commit,
    move,
  };
}
