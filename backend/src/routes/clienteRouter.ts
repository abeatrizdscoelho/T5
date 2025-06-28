import { Router } from 'express';
import {createCliente, getAllClientes, getClienteById, updateCliente, deleteCliente} from '../controllers/clienteController';

const router = Router();

router.post('/clientes', createCliente);
router.get('/clientes', getAllClientes);
router.get('/clientes/:id', getClienteById);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);

export default router;