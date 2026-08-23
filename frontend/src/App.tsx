import { useEffect, useState } from 'react'
import './App.css'

// VITE_API_URL é injetada em build-time pelo Vite a partir do .env
// (toda env var exposta ao frontend PRECISA começar com VITE_, senão o Vite não a embute no bundle).
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

type HelloResponse = {
  message: string
  ambiente: string
  hostname: string
  timestamp: string
}

function App() {
  const [data, setData] = useState<HelloResponse | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`)
        return res.json()
      })
      .then(setData)
      .catch((err) => setErro(err.message))
  }, [])

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 640 }}>
      <h1>Hello World do frontend</h1>
      <p>
        Este texto vem do React. O bloco abaixo é a resposta do <strong>backend NestJS</strong>,
        buscada em <code>{API_URL}</code>.
      </p>

      {erro && (
        <p style={{ color: 'crimson' }}>
          Erro ao chamar o backend: {erro}. Confira se o container/serviço backend está no ar e se
          VITE_API_URL aponta pro lugar certo.
        </p>
      )}

      {data && (
        <pre style={{ background: '#111', color: '#0f0', padding: '1rem', borderRadius: 8 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      {!data && !erro && <p>Carregando resposta do backend...</p>}
    </main>
  )
}

export default App
