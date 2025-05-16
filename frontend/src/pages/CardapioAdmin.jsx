
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import InputField from "../components/InputField";
import Botao from "../components/Botao";

function CardapioAdmin() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: "", preco: "", imagem: "" });
  const [modoEdicao, setModoEdicao] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("sucesso");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = () => {
    fetch("http://localhost:3000/produtos")
      .then((res) => res.json())
      .then(setProdutos);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarProduto = () => {
    if (!form.nome || !form.preco || !form.imagem) {
      setMensagem("Por favor, preencha todos os campos.");
      setTipoMensagem("erro");
      return;
    }

    setCarregando(true);
    const metodo = modoEdicao ? "PUT" : "POST";
    const url = modoEdicao
      ? `http://localhost:3000/produtos/${modoEdicao}`
      : "http://localhost:3000/produtos";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        preco: parseFloat(form.preco),
        imagem: form.imagem,
      }),
    })
      .then(() => {
        setMensagem(modoEdicao ? "Produto atualizado com sucesso!" : "Produto adicionado!");
        setTipoMensagem("sucesso");
        setForm({ nome: "", preco: "", imagem: "" });
        setModoEdicao(null);
        carregarProdutos();
      })
      .catch(() => {
        setMensagem("Erro ao salvar o produto.");
        setTipoMensagem("erro");
      })
      .finally(() => setCarregando(false));
  };

  const editarProduto = (produto) => {
    setForm(produto);
    setModoEdicao(produto.id);
  };

  const deletarProduto = (id) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    fetch(`http://localhost:3000/produtos/${id}`, { method: "DELETE" })
      .then(() => {
        setMensagem("Produto removido com sucesso.");
        setTipoMensagem("sucesso");
        carregarProdutos();
      })
      .catch(() => {
        setMensagem("Erro ao deletar produto.");
        setTipoMensagem("erro");
      });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Administração do Cardápio
      </h1>

      <div className="bg-white p-4 rounded shadow mb-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {modoEdicao ? "Editar Produto" : "Novo Produto"}
        </h2>

        <Alerta mensagem={mensagem} tipo={tipoMensagem} />

        <InputField label="Nome" name="nome" value={form.nome} onChange={handleChange} />
        <InputField label="Preço" name="preco" type="number" value={form.preco} onChange={handleChange} />
        <InputField label="Imagem (emoji ou URL)" name="imagem" value={form.imagem} onChange={handleChange} />

        <Botao onClick={salvarProduto} disabled={carregando}>
          {carregando ? "Salvando..." : modoEdicao ? "Atualizar" : "Adicionar"}
        </Botao>
      </div>

      <div className="grid gap-4 max-w-4xl mx-auto">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <span className="text-2xl mr-2">{produto.imagem}</span>
              <strong>{produto.nome}</strong> — R$ {produto.preco.toFixed(2)}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => editarProduto(produto)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => deletarProduto(produto.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardapioAdmin;
