import { useState, useEffect } from 'react';

type AbaAtiva = 'produtos' | 'servicos';

type Pedido = {
  id: number;
  cliente: { nome: string; sobrenome: string; cpf: string };
  produto: { id: number; nome: string; tipo: string };
};

function formatarCPF(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

export default function Pedidos() {
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('produtos');
  const [pedidosProdutos, setPedidosProdutos] = useState<Pedido[]>([]);
  const [pedidosServicos, setPedidosServicos] = useState<Pedido[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/consumo/produtos')
      .then(res => res.json())
      .then(setPedidosProdutos);

    fetch('http://localhost:3000/api/consumo/servicos')
      .then(res => res.json())
      .then(setPedidosServicos);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Pedidos</h2>
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
        {abaAtiva === 'produtos' && (
          <div>
            <h5>Pedidos de Produtos</h5>
            <p>Lista de pedidos de produtos...</p>
            <div>
              <table className="table">
                <thead className='table-light'>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">CPF</th>
                    <th scope="col">ID_Produto</th>
                    <th scope="col">Produto</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosProdutos.map(pedido => (
                    <tr key={pedido.id}>
                      <td>{pedido.id}</td>
                      <td>{pedido.cliente.nome} {pedido.cliente.sobrenome}</td>
                      <td>{formatarCPF(pedido.cliente.cpf)}</td>
                      <td>{pedido.produto.id}</td>
                      <td>{pedido.produto.nome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {abaAtiva === 'servicos' && (
          <div>
            <h5>Pedidos de Serviços</h5>
            <p>Lista de pedidos de serviços...</p>
            <div>
              <table className="table">
                <thead className='table-light'>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">CPF</th>
                    <th scope="col">ID_Serviço</th>
                    <th scope="col">Serviço</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosServicos.map(pedido => (
                    <tr key={pedido.id}>
                      <td>{pedido.id}</td>
                      <td>{pedido.cliente.nome} {pedido.cliente.sobrenome}</td>
                      <td>{formatarCPF(pedido.cliente.cpf)}</td>
                      <td>{pedido.produto.id}</td>
                      <td>{pedido.produto.nome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
