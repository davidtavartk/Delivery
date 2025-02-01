import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { resources } from './locales/index.ts';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

// if (process.env.NODE_ENV === 'production') {
//   disableReactDevTools();
// }


const savedLanguage = localStorage.getItem('language') || 'en';

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: savedLanguage, // language to use
  resources,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>
);
