import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//CREATE
export const createCliente = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, sobrenome, cpf, rg, email, genero, telefone, endereco } = req.body;
        const novoCliente = await prisma.cliente.create({ data: { nome, sobrenome, cpf, rg, email, genero, telefone: { create: telefone }, endereco: { create: endereco } }, include: { telefone: true, endereco: true } });
        res.json(novoCliente);
    } catch (error) {
        console.error('Erro ao cadastrar cliente.', error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente no servidor.' });
    };
};

//READ
export const getAllClientes = async (req: Request, res: Response): Promise<void> => {
    try {
        const clientes = await prisma.cliente.findMany({ include: { telefone: true, endereco: true } });
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes.', error);
        res.status(500).json({ error: 'Erro ao buscar clientes no servidor.' });
    };
};

//READ por ID
export const getClienteById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const cliente = await prisma.cliente.findUnique({ where: { id: Number(id) }, include: { telefone: true, endereco: true, consumos: { include: { produto: true } } } });
        if (!cliente) {
            res.status(404).json({ error: 'Cliente não encontrado.' });
            return;
        };
        res.json(cliente);
    } catch (error) {
        console.error('Erro ao buscar cliente.', error);
        res.status(500).json({ error: 'Erro ao buscar cliente no servidor.' });
    };
};

//UPDATE
export const updateCliente = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, sobrenome, cpf, rg, email, genero, endereco, telefone } = req.body;
    try {
        const cliente = await prisma.cliente.findUnique({ where: { id: Number(id) } });
        if (!cliente) {
            res.status(404).json({ error: 'Cliente não encontrado.' });
            return;
        };

        const { codigoPostal, rua, numero: numEndereco, bairro, cidade, estado, informacoesAdicionais } = endereco;
        const { ddd, numero: numTelefone } = telefone;

        const updatedCliente = await prisma.cliente.update({
            where: { id: Number(id) },
            data: {
                nome,
                sobrenome,
                cpf,
                rg,
                email,
                genero,
                endereco: {
                    upsert: {
                        update: {
                            codigoPostal,
                            rua,
                            numero: numEndereco,
                            bairro,
                            cidade,
                            estado,
                            informacoesAdicionais,
                        },
                        create: {
                            codigoPostal,
                            rua,
                            numero: numEndereco,
                            bairro,
                            cidade,
                            estado,
                            informacoesAdicionais,
                        }
                    }
                },
                telefone: {
                    upsert: {
                        update: {
                            ddd,
                            numero: numTelefone
                        },
                        create: {
                            ddd,
                            numero: numTelefone
                        }
                    }
                } 
            },
            include: {
                endereco: true,
                telefone: true
            },
        });
        res.json(updatedCliente);
    } catch (error) {
        console.error('Erro ao atualizar cliente.', error);
        res.status(500).json({ error: 'Erro ao atualizar cliente no servidor.' });
    };
};

//DELETE
export const deleteCliente = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const cliente = await prisma.cliente.findUnique({ where: { id: Number(id) } });
        if (!cliente) {
            res.status(404).json({ error: 'Cliente não encontrado.' });
            return;
        };
        //Exclui dados relacionados antes.
        await prisma.telefone.deleteMany({ where: { clienteId: Number(id) } });
        await prisma.endereco.deleteMany({ where: { clienteId: Number(id) } });
        await prisma.consumo.deleteMany({ where: { clienteId: Number(id) } });

        await prisma.cliente.delete({ where: { id: Number(id) } });

        res.json({ message: 'Cliente deletado!' });
    } catch (error) {
        console.error('Erro ao deletar cliente.', error);
        res.status(500).json({ error: 'Erro ao deletar cliente no servidor.' });
    };
};