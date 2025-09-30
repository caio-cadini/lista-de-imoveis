import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Imoveis from './pages/Imoveis/Imoveis.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Imoveis />
  </StrictMode>,
)
