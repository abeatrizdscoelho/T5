import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
}

//CREATE
export const createProduto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, descricao, preco }: Produto = req.body;
        const novoProduto = await prisma.produtoServico.create({ data: { nome, descricao, preco, tipo: 'PRODUTO' } });
        res.json(novoProduto);
    } catch (error) {
        console.error('Erro ao cadastrar produto.', error);
        res.status(500).json({ error: 'Erro ao cadastrar produto no servidor.' });
    };
};

//READ
export const getAllProdutos = async (req: Request, res: Response): Promise<void> => {
    try {
        const produtos = await prisma.produtoServico.findMany({ where: { tipo: 'PRODUTO' } });
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos.', error);
        res.status(500).json({ error: 'Erro ao buscar produtos no servidor.' });
    };
};

//READ por ID
export const getProdutoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const produto = await prisma.produtoServico.findUnique({ where: { id: Number(id) } });
        if (!produto || produto.tipo !== 'PRODUTO') {
            res.status(404).json({ error: 'Produto não encontrado.' });
            return;
        };
        res.json(produto);
    } catch (error) {
        console.error('Erro ao buscar produto.', error);
        res.status(500).json({ error: 'Erro ao buscar produto no servidor.' });
    };
};

//UPDATE
export const updateProduto = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, descricao, preco }: Produto = req.body;
    try {
        const produto = await prisma.produtoServico.findUnique({ where: { id: Number(id) } });
        if (!produto || produto.tipo !== 'PRODUTO') {
            res.status(404).json({ error: 'Produto não encontrado.' });
            return;
        };
        const updatedProduto = await prisma.produtoServico.update({ where: { id: Number(id) }, data: { nome, descricao, preco, tipo: 'PRODUTO' } });
        res.json(updatedProduto);
    } catch (error) {
        console.error('Erro ao atualizar produto.', error);
        res.status(500).json({ error: 'Erro ao atualizar produto no servidor.' });
    };
};

//DELETE
export const deleteProduto = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const produto = await prisma.produtoServico.findFirst({ where: { id: Number(id) } });
        if (!produto || produto.tipo !== 'PRODUTO') {
            res.status(404).json({ error: 'Produto não encontrado.' });
            return;
        };
        await prisma.produtoServico.delete({ where: { id: Number(id) } });
        res.json({ message: 'Produto deletado!' });
    } catch (error) {
        console.error('Erro ao deletar produto.', error);
        res.status(500).json({ error: 'Erro ao deletar produto no servidor.' });
    };
};