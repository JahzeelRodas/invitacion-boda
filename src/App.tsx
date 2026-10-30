import { useEffect, useState } from 'react'
import DesignA from './DesignA'
import DesignB from './DesignB'
import DesignPicker from './pages/DesignPicker'

/* ════════════════════════════════════════════════════════════════════════════
   APP — página principal de selección + los dos modelos.
   ────────────────────────────────────────────────────────────────────────────
   Rutas por hash (funciona con el botón atrás y así WhatsApp comparte tal cual):
     /            → selector de modelos
     #/modelo-1   → diseño «minimalismo azul profundo»
     #/modelo-2   → diseño «modelo elegante 2026»
   Se recuerda la selección del visitante en localStorage para volver
   directo a su invitación a la próxima visita.
   ══════════════════════════════════════════════════════════════════════════ */

type Route = 'picker' | 'a' | 'b'

const STORAGE_KEY = 'invitacion:modelo'

function routeFromHash(hash: string): Route {
  if (/#\/modelo-1/.test(hash)) return 'a'
  if (/#\/modelo-2/.test(hash)) return 'b'
  return 'picker'
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => {
    const remembered = window.localStorage.getItem(STORAGE_KEY)
    const initial = routeFromHash(window.location.hash)
    if (initial !== 'picker') return initial
    if (remembered === 'a' || remembered === 'b') return remembered
    return 'picker'
  })

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const choose = (option: 'a' | 'b') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, option)
    } catch {
      /* sin almacenamiento disponible */
    }
    window.location.hash = option === 'a' ? '#/modelo-1' : '#/modelo-2'
    setRoute(option)
  }

  if (route === 'a') return <DesignA />
  if (route === 'b') return <DesignB />
  return <DesignPicker onChoose={choose} />
}
