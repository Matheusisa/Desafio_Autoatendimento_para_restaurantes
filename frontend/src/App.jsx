import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Pedido from './pages/Pedido'
import Cozinha from './pages/Cozinha'
import CardapioAdmin from './pages/CardapioAdmin'

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">Cliente</Link>
        <Link to="/cozinha" className="hover:underline">Cozinha</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Pedido />} />
        <Route path="/cozinha" element={<Cozinha />} />
        <Route path="/admin" element={<CardapioAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
