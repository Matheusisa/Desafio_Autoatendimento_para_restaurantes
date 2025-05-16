import { useEffect, useState } from "react";

function Cozinha() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/pedidos")
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error("Erro ao carregar pedidos:", err));
  }, []);

  const alterarStatus = (id, novoStatus) => {
    fetch(`http://localhost:3000/pedidos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus }),
    })
      .then(res => res.json())
      .then(data => {
        const pedidosAtualizados = pedidos.map(p =>
          p.id === id ? { ...p, status: novoStatus } : p
        );
        setPedidos(pedidosAtualizados);
      });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Pedidos da Cozinha
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Pedido #{pedido.id}</h2>
            <ul className="text-sm text-gray-700 mb-2">
              {pedido.itens.map((item, index) => (
                <li key={index}>
                  {item.nome} x{item.qtd}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mb-3">Status: <strong>{pedido.status}</strong></p>

            <div className="flex flex-wrap gap-2">
              {["Recebido", "Em preparo", "Pronto", "Entregue"].map(status => (
                <button
                  key={status}
                  onClick={() => alterarStatus(pedido.id, status)}
                  className={`px-3 py-1 rounded text-white text-sm ${
                    pedido.status === status ? "bg-blue-600" : "bg-gray-400 hover:bg-blue-500"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cozinha;
