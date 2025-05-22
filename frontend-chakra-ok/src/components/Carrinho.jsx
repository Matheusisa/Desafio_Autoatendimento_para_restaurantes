function Carrinho({ itens, onRemover, onFinalizar, botao }) {
  const total = itens.reduce((acc, item) => acc + item.preco * item.qtd, 0);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Carrinho</h2>

      {itens.length === 0 ? (
        <p className="text-gray-500">Nenhum item no carrinho.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {itens.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>
                {item.nome} x{item.qtd}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  R$ {(item.preco * item.qtd).toFixed(2)}
                </span>
                <button
                  onClick={() => onRemover(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t pt-3 flex justify-between items-center">
        <strong>Total:</strong>
        <span>R$ {total.toFixed(2)}</span>
      </div>

      {botao ? (
        <div className="mt-4">{botao}</div>
      ) : (
        <button
          onClick={onFinalizar}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Finalizar Pedido
        </button>
      )}
    </div>
  );
}

export default Carrinho;
