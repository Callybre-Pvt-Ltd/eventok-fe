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

if (!ENV.clerkPublishableKey) {
  throw new Error('VITE_CLERK_PUBLISHABLE_KEY is required');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={ENV.clerkPublishableKey}>
      <App />
    </ClerkProvider>
  </StrictMode>,
);
