import { useEffect, useState } from "react";
import CardProduto from "../components/CardProduto";
import Carrinho from "../components/Carrinho";
import Alerta from "../components/Alerta";
import Botao from "../components/Botao";

function Pedido() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("sucesso");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/produtos")
      .then((res) => res.json())
      .then(setProdutos)
      .catch((err) => {
        setMensagem("Erro ao carregar produtos.");
        setTipoMensagem("erro");
      });
  }, []);

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

  const finalizarPedido = () => {
    if (carrinho.length === 0) {
      setMensagem("Adicione itens ao carrinho antes de finalizar.");
      setTipoMensagem("erro");
      return;
    }

    setEnviando(true);
    fetch("http://localhost:3000/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itens: carrinho }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMensagem("Pedido finalizado com sucesso!");
        setTipoMensagem("sucesso");
        setCarrinho([]);
      })
      .catch((err) => {
        setMensagem("Erro ao enviar pedido.");
        setTipoMensagem("erro");
      })
      .finally(() => setEnviando(false));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Monte seu pedido
      </h1>

      <div className="max-w-4xl mx-auto mb-4">
        <Alerta mensagem={mensagem} tipo={tipoMensagem} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="lg:col-span-2 grid gap-4">
          {produtos.length === 0 ? (
            <p className="text-gray-500">Carregando produtos...</p>
          ) : (
            produtos.map((produto) => (
              <CardProduto
                key={produto.id}
                {...produto}
                onAdd={() => adicionarAoCarrinho(produto)}
              />
            ))
          )}
        </div>

        <div>
          <Carrinho
            itens={carrinho}
            onRemover={removerDoCarrinho}
            onFinalizar={finalizarPedido}
            botao={
              <Botao onClick={finalizarPedido} disabled={enviando}>
                {enviando ? "Enviando..." : "Finalizar Pedido"}
              </Botao>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Pedido;
