// Armazenar pedidos simulados em memória
let pedidos = [];

export const criarPedido = (req, res) => {
  const { itens } = req.body;

  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ erro: "Pedido inválido ou vazio" });
  }

  const novoPedido = {
    id: Math.floor(Math.random() * 10000),
    itens,
    status: "Recebido",
    horario: new Date().toISOString(),
  };

  pedidos.push(novoPedido);

  console.log("Novo pedido recebido:", novoPedido);
  res.status(201).json({ mensagem: "Pedido criado com sucesso", pedido: novoPedido });
};

export const listarPedidos = (req, res) => {
  res.json(pedidos);
};

export const atualizarStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const pedido = pedidos.find(p => p.id == id);
  if (!pedido) {
    return res.status(404).json({ erro: "Pedido não encontrado" });
  }

  pedido.status = status;
  res.json({ mensagem: "Status atualizado", pedido });
};
