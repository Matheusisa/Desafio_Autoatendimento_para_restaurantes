let produtos = [
  { id: 1, nome: "Cheeseburger", preco: 15.00, imagem: "🍔" },
  { id: 2, nome: "Batata Média", preco: 10.00, imagem: "🍟" },
  { id: 3, nome: "Coca 350ml", preco: 6.00, imagem: "🥤" },
];

export const listarProdutos = (req, res) => {
  res.json(produtos);
};

export const criarProduto = (req, res) => {
  const { nome, preco, imagem } = req.body;
  if (!nome || !preco || !imagem) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const novoProduto = {
    id: Math.floor(Math.random() * 10000),
    nome,
    preco,
    imagem,
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
};

export const atualizarProduto = (req, res) => {
  const { id } = req.params;
  const { nome, preco, imagem } = req.body;
  const produto = produtos.find(p => p.id == id);

  if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });

  produto.nome = nome || produto.nome;
  produto.preco = preco || produto.preco;
  produto.imagem = imagem || produto.imagem;

  res.json(produto);
};

export const deletarProduto = (req, res) => {
  const { id } = req.params;
  produtos = produtos.filter(p => p.id != id);
  res.json({ mensagem: "Produto deletado com sucesso" });
};
