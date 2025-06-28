import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProdutosServicos = async (req: Request, res: Response): Promise<void> => {
  try {
    const produtosServicos = await prisma.produtoServico.findMany();
    res.json(produtosServicos);
  } catch (error) {
    console.error('Erro ao buscar produtos e serviços.', error);
    res.status(500).json({ error: 'Erro ao buscar produtos e serviços no servidor.' });
  }
};
