function Alerta({ mensagem, tipo }) {
  if (!mensagem) return null;

  return (
    <div className={`p-3 mb-4 rounded text-white ${tipo === "erro" ? "bg-red-500" : "bg-green-600"}`}>
      {mensagem}
    </div>
  );
}

export default Alerta;
