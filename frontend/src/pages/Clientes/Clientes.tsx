import '../style.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

interface Telefone {
    ddd: string;
    numero: string;
}

interface Endereco {
    cidade: string;
    estado: string;
}

interface Cliente {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    createdAt: string;
    telefone: Telefone;
    endereco: Endereco;
}

function formatarCPF(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

export default function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const CarregarClientes = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/clientes');
            const data = await res.json();
            setClientes(data);
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao carregar a lista de clientes.');
        };
    };

    useEffect(() => {
        CarregarClientes();
    }, []);

    //Função para deletar cliente.
    async function DeletarCliente(id: number) {
        try {
            const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success('Cliente excluído com sucesso!');
                setClientes(clientes.filter(cliente => cliente.id !== id)); //Remove o cliente da lista sem precisar recarregar tudo.
            } else {
                toast.error('Erro ao excluir cliente.');
            };
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao conectar com o servidor.');
        };
    };

    return (
        <div>
            <h2>Clientes</h2>
            <p>Clientes da World Beauty...</p>
            <>
                <div>
                    <table className="table">
                        <thead className='table-light'>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Cidade</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Excluir</th>
                                <th scope="col">Perfil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nome} {cliente.sobrenome}</td>
                                    <td>{cliente.email}</td>
                                    <td>{formatarCPF(cliente.cpf)}</td>
                                    <td>
                                        {cliente.telefone ? `(${cliente.telefone.ddd}) ${cliente.telefone.numero}` : 'Telefone não cadastrado'}
                                    </td>
                                    <td>{cliente.endereco.cidade}</td>
                                    <td>{cliente.endereco.estado}</td>
                                    <td>
                                        <Link to={`/editar-cliente/${cliente.id}`}>
                                            <img src="https://img.icons8.com/?size=20&id=86023&format=png&color=000000" alt="Editar" />
                                        </Link>
                                    </td>
                                    <td>
                                        <img
                                            src="https://img.icons8.com/?size=20&id=nS7wslGWJu0R&format=png&color=000000"
                                            alt="Excluir"
                                            onClick={() => DeletarCliente(cliente.id)}
                                            style={{ cursor: 'pointer' }} />
                                    </td>
                                    <td>
                                        <Link to={`/cliente/${cliente.id}`} >
                                            <img src="https://img.icons8.com/?size=20&id=82742&format=png&color=000000" alt="Detalhes" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='text-center mt-4'>
                        <Link to="/cadastrar-cliente" className='btn btn-purple'>Cadastrar Cliente</Link>
                    </div>
                </div>
            </>
        </div>
    );
};
