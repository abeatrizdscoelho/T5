import '../style.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
}

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const CarregarProdutos = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/produtos');
            const data = await res.json();
            setProdutos(data);
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao carregar a lista de produtos.');
        };
    };

    useEffect(() => {
        CarregarProdutos();
    }, []);

    //Função para deletar produto.
    async function DeletarProduto(id: number) {
        try {
            const res = await fetch(`http://localhost:3000/api/produtos/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success('Produto excluído com sucesso!');
                setProdutos(produtos.filter(produto => produto.id !== id)); //Remove o produto da lista sem precisar recarregar tudo.
            } else {
                toast.error('Erro ao excluir produto.');
            };
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao conectar com o servidor.');
        };
    };

    return (
        <div>
            <h2>Produtos</h2>
            <p>Produtos da World Beauty...</p>
            <>
                <div>
                    <table className="table">
                        <thead className='table-light'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Produto</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Preço (R$)</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.preco}</td>
                                    <td>
                                        <Link to={`/editar-produto/${produto.id}`}>
                                            <img src="https://img.icons8.com/?size=20&id=86023&format=png&color=000000" alt="Editar" />
                                        </Link>
                                    </td>
                                    <td>
                                        <img 
                                        src="https://img.icons8.com/?size=20&id=nS7wslGWJu0R&format=png&color=000000" 
                                        alt="Excluir" 
                                        onClick={() => DeletarProduto(produto.id)} 
                                        style={{ cursor: 'pointer' }}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='text-center mt-4'>
                        <Link to="/cadastrar-produto" className='btn btn-purple'>Cadastrar Produto</Link>
                    </div>
                </div>
            </>
        </div>
    );
};
