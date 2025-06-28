import '../style.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

interface Servico {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
}

export default function Servicos() {
    const [servicos, setServicos] = useState<Servico[]>([]);

    const CarregarServicos = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/servicos');
            const data = await res.json();
            setServicos(data);
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao carregar a lista de serviços.');
        };
    };

    useEffect(() => {
        CarregarServicos();
    }, []);

    //Função para deletar serviço.
    async function DeletarServico(id: number) {
        try {
            const res = await fetch(`http://localhost:3000/api/servicos/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success('Serviço excluído com sucesso!');
                setServicos(servicos.filter(servico => servico.id !== id)); //Remove o serviço da lista sem precisar recarregar tudo.
            } else {
                toast.error('Erro ao excluir serviço.');
            };
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao conectar com o servidor.');
        };
    };

    return (
        <div>
            <h2>Serviços</h2>
            <p>Serviços da World Beauty...</p>
            <>
                <div>
                    <table className="table">
                        <thead className='table-light'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Serviço</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Preço (R$)</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.map((servico) => (
                                <tr key={servico.id}>
                                    <td>{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td>{servico.descricao}</td>
                                    <td>{servico.preco}</td>
                                    <td>
                                        <Link to={`/editar-servico/${servico.id}`}>
                                            <img src="https://img.icons8.com/?size=20&id=86023&format=png&color=000000" alt="Editar" />
                                        </Link>
                                    </td>
                                    <td>
                                        <img 
                                        src="https://img.icons8.com/?size=20&id=nS7wslGWJu0R&format=png&color=000000" 
                                        alt="Excluir" 
                                        onClick={() => DeletarServico(servico.id)} 
                                        style={{ cursor: 'pointer' }}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='text-center mt-4'>
                        <Link to="/cadastrar-servico" className='btn btn-purple'>Cadastrar Serviço</Link>
                    </div>
                </div>
            </>
        </div>
    );
};
