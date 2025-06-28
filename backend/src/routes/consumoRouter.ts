import { Router } from 'express';
import {createConsumo, getConsumosProdutos, getConsumosServicos} from '../controllers/consumoController';

const router = Router();

router.post('/consumo', createConsumo);
router.get('/consumo/produtos', getConsumosProdutos);
router.get('/consumo/servicos', getConsumosServicos);

export default router;