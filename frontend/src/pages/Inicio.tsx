import { Link } from 'react-router-dom';
import './style.css';

export default function Inicio() {
  return (
    <>
      <div className="container text-center mt-5">
        <h1 className="mb-4">Bem-vindo(a) ao Sistema World Beauty</h1>
        <p className="mb-5">
          Gerencie seus clientes, produtos, serviços e pedidos de forma simples e prática.
        </p>

        <div className="row g-4">
          {[
            { title: 'Clientes', desc: 'Gerencie o cadastro dos seus clientes.', col: 4, route: '/clientes' },
            { title: 'Produtos', desc: 'Cadastre e gerencie os produtos.', col: 4, route: '/produtos' },
            { title: 'Serviços', desc: 'Cadastre e gerencie os serviços oferecidos.', col: 4, route: '/servicos' },
            { title: 'Pedidos', desc: 'Veja a lista de pedidos realizados.', col: 4, route: '/pedidos' },
            { title: 'Nova Compra', desc: 'Realize uma compra de produtos e serviços.', col: 4, route: '/nova-compra' },
            { title: 'Métricas', desc: 'Visualize as métricas da World Beauty.', col: 4, route: '/metricas' },
          ].map((item, index) => (
            <div className={`col-md-${item.col}`} key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.desc}</p>
                  <Link to={item.route} className="btn btn-purple">Acessar</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};