import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';

// Intercept all relative '/api' fetch requests and prepend VITE_API_URL if configured
const originalFetch = window.fetch;
const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  if (typeof input === 'string' && input.startsWith('/api')) {
    const apiBase = ((import.meta as any).env?.VITE_API_URL as string) || '';
    if (apiBase) {
      const cleanBase = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;
      if (cleanBase.endsWith('/api')) {
        return originalFetch(`${cleanBase}${input.slice(4)}`, init);
      } else {
        return originalFetch(`${cleanBase}${input}`, init);
      }
    }
  }
  return originalFetch(input, init);
};

try {
  Object.defineProperty(window, 'fetch', {
    value: customFetch,
    configurable: true,
    writable: true,
    enumerable: true
  });
} catch (e) {
  try {
    (window as any).fetch = customFetch;
  } catch (err) {
    console.warn('Could not intercept global fetch:', err);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);