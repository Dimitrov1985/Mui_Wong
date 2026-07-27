import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Scroll reveals hide their content until an observer fires. If scripting is
// blocked or errors out, that would leave the whole page below the fold blank —
// so the hidden state is only ever applied once we know JS is running.
document.documentElement.classList.add('has-js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
