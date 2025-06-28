import { Router } from 'express';
import {createServico, getAllServicos, getServicoById, updateServico, deleteServico} from '../controllers/servicoController';

const router = Router();

router.post('/servicos', createServico);
router.get('/servicos', getAllServicos);
router.get('/servicos/:id', getServicoById);
router.put('/servicos/:id', updateServico);
router.delete('/servicos/:id', deleteServico);

export default router;