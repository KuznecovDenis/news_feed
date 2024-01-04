import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import './base.css';
import { App } from './Components/App/App';

const rootEl: null | HTMLElement = document.getElementById('root');
if (!rootEl) throw new Error('Root is not find');

const root: Root = createRoot(rootEl);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
