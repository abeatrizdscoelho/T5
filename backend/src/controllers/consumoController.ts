import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Registra consumo de produto ou serviço.
export const createConsumo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { clienteId, produtoId, quantidade } = req.body;

        if (!clienteId || !produtoId || !quantidade) {
            res.status(400).json({ error: 'Dados incompletos' });
        }

        const produto = await prisma.produtoServico.findUnique({
            where: { id: produtoId },
        });

        if (!produto) {
            res.status(404).json({ error: 'Produto ou serviço não encontrado.' });
            return;
        }

        const valorTotal = produto.preco * quantidade;

        const novoConsumo = await prisma.consumo.create({
            data: { clienteId, produtoId, quantidade, valorTotal },
        });

        res.status(201).json(novoConsumo);

    } catch (error) {
        console.error('Erro ao registrar consumo.', error);
        res.status(500).json({ error: 'Erro ao registrar consumo no servidor.' });
    };
};

//Listar pedidos de produtos.
export const getConsumosProdutos = async (req: Request, res: Response): Promise<void> => {
  try {
    const consumos = await prisma.consumo.findMany({ where: { produto: { tipo: 'PRODUTO' } }, include: { cliente: true, produto: true }});
    res.json(consumos);

  } catch (error) {
    console.error('Erro ao listar pedidos de produtos.', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos de produtos no servidor.' });
  }
};

//Listar pedidos de serviços.
export const getConsumosServicos = async (req: Request, res: Response): Promise<void> => {
  try {
    const consumos = await prisma.consumo.findMany({ where: { produto: { tipo: 'SERVICO' } }, include: { cliente: true, produto: true }});
    res.json(consumos);
    
  } catch (error) {
    console.error('Erro ao listar pedidos de serviços.', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos de serviços no servidor.' });
  }
};
