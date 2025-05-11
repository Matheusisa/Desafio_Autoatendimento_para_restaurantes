function Carrinho({ itens, onRemover }) {
  const total = itens.reduce((acc, item) => acc + item.preco * item.qtd, 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">🛒 Carrinho</h2>

      {itens.length === 0 ? (
        <p className="text-gray-500">Nenhum item adicionado.</p>
      ) : (
        <ul className="space-y-2">
          {itens.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                {item.nome} x{item.qtd}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">R$ {(item.preco * item.qtd).toFixed(2)}</span>
                <button onClick={() => onRemover(item.id)} className="text-red-500">Remover</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {itens.length > 0 && (
        <div className="mt-4 border-t pt-4 text-right">
          <p className="text-lg font-bold">Total: R$ {total.toFixed(2)}</p>
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  );
}

export default Carrinho;
