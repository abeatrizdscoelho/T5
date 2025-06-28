import '../style.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function CadastrarProduto() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const novoProduto = { nome, descricao, preco: Number(preco) };

        try {
            const res = await fetch('http://localhost:3000/api/produtos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoProduto)
            });
            if (res.ok) {
                toast.success('Produto cadastrado com sucesso!');
                setTimeout(() => {
                    navigate('/produtos');
                }, 1500);
            } else {
                toast.error('Erro ao cadastrar produto.');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao conectar com o servidor.');
        };
    };

    return (
        <div className="container">
            <h2 className='mb-4 text-center'>Cadastro de Produto</h2>
            <div className="card shadow border p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-4 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="produto" className="form-label">Produto</label>
                            <input type="text" className="form-control" id="produto" placeholder="Digite o nome do produto" value={nome} onChange={e => setNome(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="preco" className="form-label">Preço do Produto</label>
                            <input type="number" className="form-control" id="preco" placeholder="R$0,00" value={preco} onChange={e => setPreco(e.target.value)} required />
                        </div>
                    </div>
                    <div className='mt-4 mb-3'>
                        <label htmlFor="descricao" className='form-label'>Descrição do Produto</label>
                        <input type="text" className="form-control" id="descricao" placeholder="Digite uma descrição sobre o produto" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-purple mt-2">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
