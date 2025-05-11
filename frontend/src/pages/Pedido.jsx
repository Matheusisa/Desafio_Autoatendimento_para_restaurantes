import { useState } from "react";
import CardProduto from "../components/CardProduto";
import Carrinho from "../components/Carrinho";

function Pedido() {
  const produtos = [
    { id: 1, nome: "Cheeseburger", preco: 15.00, imagem: "🍔" },
    { id: 2, nome: "Batata Média", preco: 10.00, imagem: "🍟" },
    { id: 3, nome: "Coca 350ml", preco: 6.00, imagem: "🥤" },
  ];

  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, qtd: item.qtd + 1 } : item
        );
      } else {
        return [...prev, { ...produto, qtd: 1 }];
      }
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qtd: item.qtd - 1 } : item
        )
        .filter((item) => item.qtd > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Monte seu pedido
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid gap-4">
          {produtos.map((produto) => (
            <CardProduto
              key={produto.id}
              {...produto}
              onAdd={() => adicionarAoCarrinho(produto)}
            />
          ))}
        </div>

        <div>
          <Carrinho itens={carrinho} onRemover={removerDoCarrinho} />
        </div>
      </div>
    </div>
  );
}

export default Pedido;
