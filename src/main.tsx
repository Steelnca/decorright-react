import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './utils/i18n.ts'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
