import '../style.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function formatarCPF(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function formatarRG(rg: string): string {
  //Remove tudo que não for dígito.
  const apenasNumeros = rg.replace(/\D/g, '');

  //Aplica só se tiver 9 dígitos.
  if (!/^\d{9}$/.test(apenasNumeros)) {
    return rg; 
  }

  return apenasNumeros.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
}


export default function ClienteDetalhes() {
    const { id } = useParams();
    const [cliente, setCliente] = useState<any>(null);

    const DetalhesCliente = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/clientes/${id}`);
            const data = await res.json();
            setCliente(data);
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao carregar os dados do cliente.');
        };
    };

    useEffect(() => {
        DetalhesCliente();
    }, [id]);

    if (!cliente) return <p>Carregando dados do cliente...</p>;

    return (
        <div className="container mt-4">
            <h2>Detalhes do Cliente</h2>
            <div className="border rounded p-4 bg-light">
                <h5><strong>{cliente.nome} {cliente.sobreNome}</strong></h5>
                <p className='mt-3'><strong>Email:</strong> {cliente.email}</p>
                <p className='mt-3'><strong>RG:</strong> {formatarRG(cliente.rg)}</p>
                <p className='mt-3'><strong>CPF:</strong> {formatarCPF(cliente.cpf)}</p>
                <p><strong>Telefone: </strong>
                    {cliente.telefone ? `(${cliente.telefone.ddd}) ${cliente.telefone.numero}` : 'Telefone não cadastrado'}
                </p>
                <h6 className="mt-3"><strong>Endereço</strong></h6>
                {cliente.endereco ? (
                    <ul className="list-unstyled">
                        <li><strong>CEP:</strong> {cliente.endereco.codigoPostal}</li>
                        <li><strong>Rua:</strong> {cliente.endereco.rua}, {cliente.endereco.numero}</li>
                        <li><strong>Bairro:</strong> {cliente.endereco.bairro}</li>
                        <li><strong>Cidade:</strong> {cliente.endereco.cidade} - {cliente.endereco.estado}</li>
                        {cliente.endereco.informacoesAdicionais && (
                            <li><strong>Complemento:</strong> {cliente.endereco.informacoesAdicionais}</li>
                        )}
                    </ul>
                ) : (
                    <p>Endereço não cadastrado.</p>
                )}
                <div className="mt-4">
                    <Link to="/clientes" className="btn btn-purple">Voltar</Link>
                </div>
            </div>
        </div>
    );
};
