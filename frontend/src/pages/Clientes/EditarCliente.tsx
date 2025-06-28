import '../style.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function EditarCliente() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [email, setEmail] = useState('');
    const [genero, setGenero] = useState('');
    const [endereco, setEndereco] = useState({ codigoPostal: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', informacoesAdicionais: '' });
    const [telefone, setTelefone] = useState({ ddd: '', numero: '' });

    useEffect(() => {
        async function CarregarCliente() {
            try {
                const res = await fetch(`http://localhost:3000/api/clientes/${id}`);
                const data = await res.json();
                setNome(data.nome);
                setSobrenome(data.sobrenome);
                setCpf(data.cpf);
                setRg(data.rg);
                setEmail(data.email);
                setGenero(data.genero);
                setEndereco(data.endereco);
                setTelefone(data.telefone);
            } catch (error) {
                console.error('Erro ao conectar com o servidor.', error);
                toast.error('Erro ao carregar os dados do cliente.');
            };
        };
        CarregarCliente();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const EditarCliente = { id: Number(id), nome, sobrenome, cpf, rg, email, genero, endereco, telefone };
        try {
            const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(EditarCliente)
            });
            if (res.ok) {
                toast.success('Cliente editado com sucesso!');
                setTimeout(() => {
                    navigate('/clientes');
                }, 1500);
            } else {
                toast.error('Erro ao editar cliente.')
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao conectar com o servidor.');
        };
    };

    return (
        <div className="container">
            <h2 className='mb-4 text-center'>Editar Cliente</h2>
            <div className="card shadow border p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-4 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" placeholder="Digite o nome" value={nome} onChange={e => setNome(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                            <input type="text" className="form-control" id="sobrenome" placeholder="Digite o sobrenome" value={sobrenome} onChange={e => setSobrenome(e.target.value)} required />
                        </div>
                    </div>
                    <div className='row mt-4 mb-3'>
                        <div className="col-md-6">
                            <label htmlFor="CPF" className="form-label">CPF</label>
                            <input type="number" className="form-control" id="CPF" placeholder="000.000.000-00" value={cpf} onChange={e => setCpf(e.target.value)} required />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor="RG" className="form-label">RG</label>
                            <input type="text" className="form-control" id="RG" placeholder="00.000.000-0" value={rg} onChange={e => setRg(e.target.value)} required />
                        </div>
                    </div>
                    <div className='row mt-4 mb-3'>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="Digite o e-mail" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Gênero</label>
                            <select className="form-select" value={genero} onChange={e => setGenero(e.target.value)} required>
                                <option value="">Selecione</option>
                                <option value="FEMININO">Feminino</option>
                                <option value="MASCULINO">Masculino</option>
                                <option value="OUTRO">Outro</option>
                            </select>
                        </div>
                    </div>

                    {/* Telefone */}
                    <h5 className="mt-5">Telefone</h5>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <input type="number" className="form-control" placeholder="DDD" value={telefone.ddd} onChange={e => setTelefone({ ...telefone, ddd: e.target.value })} required />
                        </div>
                        <div className="col-md-10">
                            <div className="d-flex">
                                <input type="number" className="form-control me-2" placeholder="Número" value={telefone.numero} onChange={e => setTelefone({ ...telefone, numero: e.target.value })} required />
                            </div>
                        </div>
                    </div>

                    {/* Endereço */}
                    <h5 className="mt-4">Endereço</h5>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="CEP" value={endereco.codigoPostal} onChange={e => setEndereco({ ...endereco, codigoPostal: e.target.value })} required />
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control" placeholder="Rua" value={endereco.rua} onChange={e => setEndereco({ ...endereco, rua: e.target.value })} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Número" value={endereco.numero} onChange={e => setEndereco({ ...endereco, numero: e.target.value })} required />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Bairro" value={endereco.bairro} onChange={e => setEndereco({ ...endereco, bairro: e.target.value })} required />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Cidade" value={endereco.cidade} onChange={e => setEndereco({ ...endereco, cidade: e.target.value })} required />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Estado" value={endereco.estado} onChange={e => setEndereco({ ...endereco, estado: e.target.value })} required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Informações adicionais" value={endereco.informacoesAdicionais} onChange={e => setEndereco({ ...endereco, informacoesAdicionais: e.target.value })} />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-purple mt-2">Editar Cliente</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
