import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * iOS standalone (home-screen) mode sometimes under-sizes the layout
 * viewport — after keyboard use, or from status-bar accounting — which makes
 * every CSS unit (%, vh, dvh) inherit the same wrong height and leaves dead
 * space under the footer. visualViewport reports the true visible height and
 * keeps reporting it correctly through keyboard open/close, so measure it
 * and drive the layout from --app-height instead.
 */
function syncViewportHeight() {
  const height = window.visualViewport?.height ?? window.innerHeight
  document.documentElement.style.setProperty('--app-height', `${Math.round(height)}px`)
}
syncViewportHeight()
window.visualViewport?.addEventListener('resize', syncViewportHeight)
window.addEventListener('resize', syncViewportHeight)
window.addEventListener('orientationchange', () => setTimeout(syncViewportHeight, 250))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
