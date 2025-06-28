import { Router } from 'express';
import {listarClientesPorGenero, listarMaisConsumidos, listarConsumoPorGenero, listarTop10ClientesMaisConsumiram, listarTop10ClientesMenosConsumiram, listarTop5ClientesMaisValor} from '../controllers/metricasController';

const router = Router();

router.get('/clientes-por-genero', listarClientesPorGenero);
router.get('/mais-consumidos', listarMaisConsumidos);
router.get('/consumo-por-genero', listarConsumoPorGenero);
router.get('/top-10-mais-quantidade', listarTop10ClientesMaisConsumiram);
router.get('/top-10-menos-quantidade', listarTop10ClientesMenosConsumiram);
router.get('/top-5-mais-valor', listarTop5ClientesMaisValor);

export default router;
