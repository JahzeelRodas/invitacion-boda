import { useEffect, useState } from 'react'
import DesignA from './DesignA'
import DesignB from './DesignB'
import DesignPicker from './pages/DesignPicker'

/* ════════════════════════════════════════════════════════════════════════════
   APP — página principal + los dos modelos.
   ────────────────────────────────────────────────────────────────────────────
   Rutas por hash (funciona con el botón atrás y así WhatsApp comparte tal cual):
     /            → diseño «modelo elegante 2026» (MODELO 2 POR DEFECTO)
     #/modelo-1   → diseño «minimalismo azul profundo»
     #/modelo-2   → diseño «modelo elegante 2026»
     #/modelos    → selector para comparar los dos diseños
   ══════════════════════════════════════════════════════════════════════════ */

type Route = 'picker' | 'a' | 'b'

function routeFromHash(hash: string): Route {
  if (/#\/modelo-1/.test(hash)) return 'a'
  if (/#\/modelo-2/.test(hash)) return 'b'
  if (/#\/modelos/.test(hash)) return 'picker'
  return 'b'
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash))

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const choose = (option: 'a' | 'b') => {
    window.location.hash = option === 'a' ? '#/modelo-1' : '#/modelo-2'
    setRoute(option)
  }

  if (route === 'a') return <DesignA />
  if (route === 'b') return <DesignB />
  return <DesignPicker onChoose={choose} />
}
