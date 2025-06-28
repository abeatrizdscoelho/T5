import { Router } from 'express';
import { getProdutosServicos } from '../controllers/produtoServicoController';

const router = Router();

router.get('/produtos-servicos', getProdutosServicos);

export default router;
