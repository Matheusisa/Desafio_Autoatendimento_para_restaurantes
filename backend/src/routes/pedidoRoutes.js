import express from 'express';
import { criarPedido, listarPedidos, atualizarStatus } from '../controllers/pedidoController.js';

const router = express.Router();

router.post('/', criarPedido);
router.get('/', listarPedidos);
router.put('/:id', atualizarStatus);

export default router;
