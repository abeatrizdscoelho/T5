import { Link } from 'react-router-dom';
import './style.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-purple">
      <div className="container">
        <Link className="navbar-brand logo-text" to="/">World Beauty</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/clientes">Clientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/produtos">Produtos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/servicos">Serviços</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/pedidos">Pedidos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/nova-compra">Nova Compra</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/metricas">Métricas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}