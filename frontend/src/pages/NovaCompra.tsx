import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

type AbaAtiva = 'produtos' | 'servicos';

type Cliente = {
  id: number;
  nome: string;
  sobrenome: string;
};

type ProdutoServico = {
  id: number;
  nome: string;
  tipo: 'PRODUTO' | 'SERVICO';
};

export default function NovaCompra() {
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('produtos');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtosServicos, setProdutosServicos] = useState<ProdutoServico[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState('1');

  useEffect(() => {
    fetch('http://localhost:3000/api/clientes')
      .then(res => res.json())
      .then(setClientes);

    fetch('http://localhost:3000/api/produtos-servicos')
      .then(res => res.json())
      .then(setProdutosServicos);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteSelecionado || !produtoSelecionado || !quantidade) {
      toast.error('Preencha todos os campos.');
      return;
    }

    const dados = { clienteId: parseInt(clienteSelecionado), produtoId: parseInt(produtoSelecionado), quantidade: parseInt(quantidade) };

    try {
      const res = await fetch('http://localhost:3000/api/consumo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      const resultado = await res.json();

      if (res.ok) {
        toast.success('Compra registrada com sucesso!');
        setClienteSelecionado('');
        setProdutoSelecionado('');
        setQuantidade('1');
      } else {
        toast.error('Erro: ' + resultado.error);
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Compras</h2>
      <p>Registre aqui uma nova compra...</p>
      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === 'produtos' ? 'active' : ''}`} onClick={() => setAbaAtiva('produtos')} > Produtos
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === 'servicos' ? 'active' : ''}`} onClick={() => setAbaAtiva('servicos')} > Serviços
          </button>
        </li>
      </ul>

      <div className="mt-4">
        <h5 className='mb-3'>Compra de {abaAtiva === 'produtos' ? 'Produtos' : 'Serviços'}</h5>
        <div className='card shadow border p-4'>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Cliente</label>
              <select className="form-select" value={clienteSelecionado} onChange={(e) => setClienteSelecionado(e.target.value)}>
                <option value="">Selecione o Cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>{cliente.nome} {cliente.sobrenome}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">{abaAtiva === 'produtos' ? 'Produto' : 'Serviço'}</label>
              <select className="form-select" value={produtoSelecionado} onChange={(e) => setProdutoSelecionado(e.target.value)}>
                <option value="">Selecione</option>
                {produtosServicos.filter(p => p.tipo === (abaAtiva === 'produtos' ? 'PRODUTO' : 'SERVICO'))
                  .map(produto => (
                    <option key={produto.id} value={produto.id}>{produto.nome}</option>
                  ))}
              </select>
            </div>

            {abaAtiva === 'produtos' && (
              <div className="mb-3">
                <label className="form-label">Quantidade</label>
                <input type="number" className="form-control" value={quantidade} min="1" placeholder='Digite a quantidade' onChange={(e) => setQuantidade(e.target.value)} />
              </div>
            )}

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-purple">Registrar Compra</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};