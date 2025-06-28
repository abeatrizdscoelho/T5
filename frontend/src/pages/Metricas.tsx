import { useState, useEffect, ChangeEvent } from 'react';

export default function Metricas() {
    const [metricaSelecionada, setMetricaSelecionada] = useState<string>('');
    const [clientesPorGenero, setClientesPorGenero] = useState<{ genero: string, quantidade: number }[]>([]);
    const [maisConsumidos, setMaisConsumidos] = useState<{ nome: string, quantidade: number }[]>([]);
    const [consumoPorGenero, setConsumoPorGenero] = useState<{ genero: string, nome: string, quantidade: number }[]>([]);
    const [top10MaisQuantidade, setTop10MaisQuantidade] = useState<{ nome: string, quantidade: number }[]>([]);
    const [top10MenosQuantidade, setTop10MenosQuantidade] = useState<{ nome: string, quantidade: number }[]>([]);
    const [top5MaisValor, setTop5MaisValor] = useState<{ nome: string, valorTotal: number }[]>([]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setMetricaSelecionada(e.target.value);
    };

    useEffect(() => {
        //Listagem de Cliente por Gênero.
        if (metricaSelecionada === 'clientesGenero') {
            fetch('http://localhost:3000/api/metricas/clientes-por-genero')
                .then(res => res.json())
                .then(data => setClientesPorGenero(data))
                .catch(error => console.error('Erro ao buscar clientes por gênero.', error));
        }

        //Listagem de Produtos e Serviços gerais mais Consumidos.
        if (metricaSelecionada === 'maisConsumidos') {
            fetch('http://localhost:3000/api/metricas/mais-consumidos')
                .then(res => res.json())
                .then(data => setMaisConsumidos(data))
                .catch(error => console.error('Erro ao buscar os mais consumidos.', error));
        }

        //Listagem de Consumo por Gênero.
        if (metricaSelecionada === 'consumoPorGenero') {
            fetch('http://localhost:3000/api/metricas/consumo-por-genero')
                .then(res => res.json())
                .then(data => setConsumoPorGenero(data))
                .catch(error => console.error('Erro ao buscar consumo por gênero.', error));
        }

        //Listagem de 10 Clientes que Mais Consumiram.
        if (metricaSelecionada === '10ClientesMaisConsumiram') {
            fetch('http://localhost:3000/api/metricas/top-10-mais-quantidade')
                .then(res => res.json())
                .then(data => setTop10MaisQuantidade(data))
                .catch(error => console.error('Erro ao buscar top 10 clientes que mais consumiram.', error));
        }

        //Listagem de 10 Clientes que Menos Consumiram.
        if (metricaSelecionada === '10ClientesMenosConsumiram') {
            fetch('http://localhost:3000/api/metricas/top-10-menos-quantidade')
                .then(res => res.json())
                .then(data => setTop10MenosQuantidade(data))
                .catch(error => console.error('Erro ao buscar top 10 clientes com menor consumo.', error));
        }

        //Listagem de 5 Clientes que Mais Consumiram por Valor.
        if (metricaSelecionada === '5ClientesMaisConsumiramValor') {
            fetch('http://localhost:3000/api/metricas/top-5-mais-valor')
                .then(res => res.json())
                .then(data => setTop5MaisValor(data))
                .catch(error => console.error('Erro ao buscar top 5 clientes que mais consumiram por valor.', error));
        }

    }, [metricaSelecionada]);

    const renderizarConteudo = () => {
        switch (metricaSelecionada) {
            case 'clientesGenero':
                return (
                    <div>
                        <h5>Clientes por Gênero</h5>
                        <ul>
                            {clientesPorGenero.map((item, index) => (
                                <li key={index}>{item.genero}: {item.quantidade}</li>
                            ))}
                        </ul>
                    </div>
                );
            case 'maisConsumidos':
                return (
                    <div>
                        <h5>Produtos e Serviços Mais Consumidos</h5>
                        <ul>
                            {maisConsumidos.map((item, index) => (
                                <li key={index}>{item.nome}: {item.quantidade}</li>
                            ))}
                        </ul>
                    </div>
                );
            case 'consumoPorGenero':
                return (
                    <div>
                        <h5>Consumo por Gênero</h5>
                        <ul>
                            {consumoPorGenero.map((item, index) => (
                                <li key={index}>
                                    {item.genero} - {item.nome}: {item.quantidade}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case '10ClientesMaisConsumiram':
                return (
                    <div>
                        <h5>Top 10 Clientes que mais consumiram (em quantidade)</h5>
                        <ol>
                            {top10MaisQuantidade.map((item, index) => (
                                <li key={index}>
                                    {item.nome}: {item.quantidade} item(s)
                                </li>
                            ))}
                        </ol>
                    </div>
                );
            case '10ClientesMenosConsumiram':
                return (
                    <div>
                        <h5>Top 10 Clientes que menos consumiram (em quantidade)</h5>
                        <ol>
                            {top10MenosQuantidade.map((item, index) => (
                                <li key={index}>
                                    {item.nome}: {item.quantidade} item(s)
                                </li>
                            ))}
                        </ol>
                    </div>
                );
            case '5ClientesMaisConsumiramValor':
                return (
                    <div>
                        <h5>Top 5 Clientes que mais consumiram (em valor)</h5>
                        <ol>
                            {top5MaisValor.map((item, index) => (
                                <li key={index}>
                                    {item.nome}: R$ {item.valorTotal.toFixed(2)}
                                </li>
                            ))}
                        </ol>
                    </div>
                );
            default:
                return <p>Selecione uma métrica para visualizar.</p>;
        }
    }

    return (
        <div className="container mt-5" >
            <h2 className="text-center mb-4">Métricas da World Beauty</h2>
            <div className="mb-4 text-center">
                <select
                    className="form-select w-50 mx-auto"
                    value={metricaSelecionada}
                    onChange={handleChange}
                >
                    <option value="">Selecione uma métrica</option>
                    <option value="clientesGenero">Todos os clientes por gênero</option>
                    <option value="maisConsumidos">Produtos e serviços gerais mais consumidos</option>
                    <option value="consumoPorGenero">Produtos e serviços mais consumidos por gênero</option>
                    <option value="10ClientesMaisConsumiram">10 clientes que mais consumiram em quantidade</option>
                    <option value="10ClientesMenosConsumiram">10 clientes que menos consumiram produtos ou serviços</option>
                    <option value="5ClientesMaisConsumiramValor">5 clientes que mais consumiram em valor</option>
                </select>
            </div>
            <div className="border rounded p-4 bg-light">
                {renderizarConteudo()}
            </div>
        </div>
    );
};
