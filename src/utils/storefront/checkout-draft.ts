/**
 * Checkout draft persistence.
 *
 * A shopper who fills in the event date, venue and contact details and only then
 * discovers they need an account must not lose that work. The draft is written to
 * sessionStorage on every change and restored when they come back from login or
 * signup, so the round trip through auth is invisible to them.
 *
 * sessionStorage (not localStorage): the draft belongs to this purchase attempt,
 * not to the browser forever.
 */

const DRAFT_KEY = 'eventok_checkout_draft';

export function saveCheckoutDraft(draft: unknown): void {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Private mode / blocked storage: the draft is a convenience, never a requirement.
  }
}

export function readCheckoutDraft<T>(): Partial<T> | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as Partial<T>;
  } catch {
    return null;
  }
}

export function clearCheckoutDraft(): void {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // Nothing to do — an unclearable draft is harmless.
  }
}
