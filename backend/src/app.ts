import cors from 'cors';
import express from 'express';
import clienteRouter from './routes/clienteRouter';
import produtoRouter from './routes/produtoRouter';
import servicoRouter from './routes/servicoRouter';
import consumoRouter from './routes/consumoRouter';
import produtoServicoRouter from './routes/produtoServicoRouter';
import metricasRouter from './routes/metricasRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', clienteRouter);
app.use('/api', produtoRouter);
app.use('/api', servicoRouter);
app.use('/api', consumoRouter);
app.use('/api', produtoServicoRouter);
app.use('/api/metricas', metricasRouter);

app.get('/', (req, res) => {
  res.send('API funcionando corretamente!');
});

export default app;