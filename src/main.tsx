import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter
} from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './components/AuthProvider.tsx';
import './index.scss';
import theme from './theme.ts';
import { GradientProvider } from './components/GradientProvider.tsx';
import { IsMobileProvider } from './components/IsMobileProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <IsMobileProvider>
            <GradientProvider>
              <App />
            </GradientProvider>
          </IsMobileProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
