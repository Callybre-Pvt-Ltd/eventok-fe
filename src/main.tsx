import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/react';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';
import '@fontsource/outfit/800.css';
import '@fontsource/baloo-2/600.css';
import '@fontsource/baloo-2/700.css';
import '@fontsource/baloo-2/800.css';
import '@fontsource/lora/400-italic.css';
import '@fontsource/lora/600-italic.css';
import './index.css';
import App from './App.tsx';
import { ENV } from './config/env.ts';

// A redeploy deletes the previous build's route chunks; reload onto the new build instead
// of crashing an open tab. The timestamp stops a reload loop if a chunk is truly broken.
const CHUNK_RELOAD_KEY = 'eventok_chunk_reload_at';
const CHUNK_RELOAD_COOLDOWN_MS = 10_000;
window.addEventListener('vite:preloadError', event => {
  try {
    const last = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) ?? 0);
    if (Date.now() - last < CHUNK_RELOAD_COOLDOWN_MS) return;
    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
  } catch {
    return;
  }
  event.preventDefault();
  window.location.reload();
});

if (!ENV.clerkPublishableKey) {
  throw new Error('VITE_CLERK_PUBLISHABLE_KEY is required');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={ENV.clerkPublishableKey}
      signInFallbackRedirectUrl="/auth/continue"
      signUpFallbackRedirectUrl="/auth/continue"
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
