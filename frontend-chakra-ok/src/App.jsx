import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pedido from "./pages/Pedido";
import Cozinha from "./pages/Cozinha";
import CardapioAdmin from "./pages/CardapioAdmin";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pedido />} />
          <Route path="cozinha" element={<Cozinha />} />
          <Route path="admin" element={<CardapioAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}
