import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import produtoRoutes from './routes/produtoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de autoatendimento funcionando 🚀');
});

// Rotas da aplicação
app.use('/produtos', produtoRoutes);
app.use('/pedidos', pedidoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
