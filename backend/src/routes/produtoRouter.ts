import { Router } from 'express';
import {createProduto, getAllProdutos, getProdutoById, updateProduto, deleteProduto} from '../controllers/produtoController';

const router = Router();

router.post('/produtos', createProduto);
router.get('/produtos', getAllProdutos);
router.get('/produtos/:id', getProdutoById);
router.put('/produtos/:id', updateProduto);
router.delete('/produtos/:id', deleteProduto);

export default router;