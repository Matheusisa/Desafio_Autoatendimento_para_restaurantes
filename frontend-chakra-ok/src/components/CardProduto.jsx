function CardProduto({ nome, preco, imagem, onAdd }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition">
      <div className="flex items-center space-x-4">
        <span className="text-3xl">{imagem}</span>
        <div>
          <h2 className="text-lg font-semibold">{nome}</h2>
          <p className="text-sm text-gray-500">R$ {preco.toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
      >
        Adicionar
      </button>
    </div>
  );
}

export default CardProduto;
