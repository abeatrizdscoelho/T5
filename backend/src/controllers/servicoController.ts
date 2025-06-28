import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Servico {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
}

//CREATE
export const createServico = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, descricao, preco }: Servico = req.body;
        const novoServico = await prisma.produtoServico.create({ data: { nome, descricao, preco, tipo: 'SERVICO' } });
        res.json(novoServico);
    } catch (error) {
        console.error('Erro ao cadastrar serviço.', error);
        res.status(500).json({ error: 'Erro ao cadastrar serviço no servidor.' });
    };
};

//READ
export const getAllServicos = async (req: Request, res: Response): Promise<void> => {
    try {
        const servicos = await prisma.produtoServico.findMany({ where: { tipo: 'SERVICO' } });
        res.json(servicos);
    } catch (error) {
        console.error('Erro ao buscar serviços.', error);
        res.status(500).json({ error: 'Erro ao buscar serviços no servidor.' });
    };
};

//READ por ID
export const getServicoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const servico = await prisma.produtoServico.findUnique({ where: { id: Number(id) } });
        if (!servico || servico.tipo !== 'SERVICO') {
            res.status(404).json({ error: 'Serviço não encontrado.' });
            return;
        };
        res.json(servico);
    } catch (error) {
        console.error('Erro ao buscar serviço.', error);
        res.status(500).json({ error: 'Erro ao buscar serviço no servidor.' });
    };
};

//UPDATE
export const updateServico = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, descricao, preco }: Servico = req.body;
    try {
        const servico = await prisma.produtoServico.findUnique({ where: { id: Number(id) } });
        if (!servico || servico.tipo !== 'SERVICO') {
            res.status(404).json({ error: 'Serviço não encontrado.' });
            return;
        };
        const updatedServico = await prisma.produtoServico.update({ where: { id: Number(id) }, data: { nome, descricao, preco, tipo: 'SERVICO' } });
        res.json(updatedServico);
    } catch (error) {
        console.error('Erro ao atualizar serviço.', error);
        res.status(500).json({ error: 'Erro ao atualizar serviço no servidor.' });
    };
};

//DELETE
export const deleteServico = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const servico = await prisma.produtoServico.findFirst({ where: { id: Number(id) } });
        if (!servico || servico.tipo !== 'SERVICO') {
            res.status(404).json({ error: 'Serviço não encontrado.' });
            return;
        };
        await prisma.produtoServico.delete({ where: { id: Number(id) } });
        res.json({ message: 'Serviço deletado!' });
    } catch (error) {
        console.error('Erro ao deletar serviço.', error);
        res.status(500).json({ error: 'Erro ao deletar serviço no servidor.' });
    };
};