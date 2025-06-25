import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ThemeRegistry from './libs/theme/ThemeRegistry.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeRegistry>
        <App />
      </ThemeRegistry>
    </BrowserRouter>
  </StrictMode>,
);
