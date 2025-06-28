import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const formatarGenero = (genero: string) => {
  return genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase();
};

export const listarClientesPorGenero = async (req: Request, res: Response): Promise<void> => {
    try {
        const resultado = await prisma.cliente.groupBy({ by: ['genero'], _count: { genero: true } });
        const resposta = resultado.map(item => ({ genero: formatarGenero(item.genero), quantidade: item._count.genero }));
        res.status(200).json(resposta);

    } catch (error) {
        console.error('Erro ao buscar clientes por gênero.', error);
        res.status(500).json({ mensagem: 'Erro ao buscar clientes por gênero.' });
    }
};

export const listarMaisConsumidos = async (req: Request, res: Response): Promise<void> => {
    try {
        const resultado = await prisma.consumo.groupBy({ by: ['produtoId'], _sum: { quantidade: true }, orderBy: { _sum: { quantidade: 'desc' } } });

        const dados = await Promise.all(
            resultado.map(async (item) => {
                const produto = await prisma.produtoServico.findUnique({ where: { id: item.produtoId } });
                return { nome: produto?.nome || 'Desconhecido', quantidade: item._sum.quantidade ?? 0 };
            })
        );
        res.status(200).json(dados);

    } catch (error) {
        console.error('Erro ao buscar produtos e serviços mais consumidos.', error);
        res.status(500).json({ mensagem: 'Erro ao buscar produtos e serviços mais consumidos.' });
    }
};

export const listarConsumoPorGenero = async (req: Request, res: Response): Promise<void> => {
    try {
        const resultado = await prisma.consumo.findMany({ include: { cliente: true, produto: true } });

        //Agrupando por genero + produtoId.
        const agrupados: { [chave: string]: { genero: string, nome: string, quantidade: number } } = {};

        for (const item of resultado) {
            const chave = `${item.cliente.genero}-${item.produtoId}`;
            if (!agrupados[chave]) {
                agrupados[chave] = {
                    genero: formatarGenero(item.cliente.genero),
                    nome: item.produto.nome,
                    quantidade: item.quantidade
                };
            } else {
                agrupados[chave].quantidade += item.quantidade;
            }
        }

        const resposta = Object.values(agrupados);
        res.status(200).json(resposta);

    } catch (error) {
        console.error('Erro ao buscar consumo por gênero.', error);
        res.status(500).json({ mensagem: 'Erro ao buscar consumo por gênero.' });
    }
};

export const listarTop10ClientesMaisConsumiram = async (req: Request, res: Response): Promise<void> => {
    try {
        const resultado = await prisma.consumo.groupBy({ by: ['clienteId'], _sum: { quantidade: true }, orderBy: { _sum: { quantidade: 'desc' }, }, take: 10 });

        const resposta = await Promise.all(
            resultado.map(async item => {
                const cliente = await prisma.cliente.findUnique({ where: { id: item.clienteId } });
                return {
                    nome: cliente ? `${cliente.nome} ${cliente.sobrenome}` : 'Cliente desconhecido',
                    quantidade: item._sum.quantidade ?? 0
                };
            })
        );
        res.status(200).json(resposta);

    } catch (error) {
        console.error('Erro ao buscar top 10 clientes que mais consumiram.', error);
        res.status(500).json({ mensagem: 'Erro ao buscar top 10 clientes que mais consumiram.' });
    }
};

export const listarTop10ClientesMenosConsumiram = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await prisma.consumo.groupBy({ by: ['clienteId'], _sum: { quantidade: true }, orderBy: { _sum: { quantidade: 'asc' }, }, take: 10 });

    const resposta = await Promise.all(
      resultado.map(async item => {
        const cliente = await prisma.cliente.findUnique({ where: { id: item.clienteId } });
        return {
          nome: cliente ? `${cliente.nome} ${cliente.sobrenome}` : 'Cliente desconhecido',
          quantidade: item._sum.quantidade ?? 0
        };
      })
    );
    res.status(200).json(resposta);

  } catch (error) {
    console.error('Erro ao buscar top 10 clientes com menor consumo.', error);
    res.status(500).json({ mensagem: 'Erro ao buscar top 10 clientes com menor consumo.' });
  }
};

export const listarTop5ClientesMaisValor = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await prisma.consumo.groupBy({ by: ['clienteId'], _sum: { valorTotal: true}, orderBy: { _sum: { valorTotal: 'desc' },}, take: 5 });

    const resposta = await Promise.all(
      resultado.map(async item => {
        const cliente = await prisma.cliente.findUnique({ where: { id: item.clienteId } });
        return {
          nome: cliente ? `${cliente.nome} ${cliente.sobrenome}` : 'Cliente desconhecido',
          valorTotal: item._sum.valorTotal ?? 0
        };
      })
    );
    res.status(200).json(resposta);

  } catch (error) {
    console.error('Erro ao buscar top 5 clientes que mais consumiram por valor:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar top 5 clientes que mais consumiram por valor.' });
  }
};
