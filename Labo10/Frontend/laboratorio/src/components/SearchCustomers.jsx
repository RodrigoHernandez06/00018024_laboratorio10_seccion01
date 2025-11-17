import React, { useState } from 'react';
import API from '../utils/api';
import "../styles/SearchCustomers.css";

const SearchCustomers = () => {
  const [code, setCode] = useState('');
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setSearched(false);
    setLoading(true);

    if (!code.trim()) {
      setError('Por favor ingrese un código para buscar');
      setLoading(false);
      return;
    }

    try {
      const response = await API.get(`/customers/search?code=${code.trim()}`);
      setCustomers(response.data);
      setSearched(true);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la búsqueda');
      setSearched(true);
      setLoading(false);
      console.error('Error searching customers:', err);
    }
  };

  const handleClear = () => {
    setCode('');
    setCustomers([]);
    setError('');
    setSearched(false);
  };

  return (
    <div className="search-customers-container">
      <div className="search-card">
        <h2 className="search-title">Buscar Cliente por Código</h2>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ej: CUST001"
              className="search-input"
              disabled={loading}
            />
            <button
              type="submit"
              className={`search-button primary ${loading ? 'disabled' : ''}`}
              disabled={loading}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            {(code || searched) && (
              <button
                type="button"
                onClick={handleClear}
                className="search-button secondary"
                disabled={loading}
              >
                Limpiar
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="search-error-message">
            {error}
          </div>
        )}

        {searched && customers.length === 0 && !error && (
          <div className="not-found-message">
            <span className="not-found-icon">🔍</span>
            <h3>No se encontraron resultados</h3>
            <p>No existe ningún cliente con el código: <strong>{code}</strong></p>
            <p className="search-hint">Verifique que el código esté escrito correctamente</p>
          </div>
        )}

        {customers.length > 0 && (
          <>
            <div className="results-header">
              <h3 className="results-title">
                {customers.length} resultado{customers.length > 1 ? 's' : ''} encontrado{customers.length > 1 ? 's' : ''}
              </h3>
            </div>

            <div className="results-container">
              {customers.map((customer) => (
                <div key={customer.id} className="customer-card">
                  <div className="card-header">
                    <span className="customer-id">ID: {customer.id}</span>
                    <span className="customer-code">{customer.code}</span>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="customer-name">{customer.name}</h3>
                    
                    <div className="info-row">
                      <span className="info-label">Dirección:</span>
                      <span className="info-value">{customer.address || 'No registrada'}</span>
                    </div>
                    
                    <div className="info-row">
                      <span className="info-label">Teléfono:</span>
                      <span className="info-value">{customer.phone || 'No registrado'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {customers.length > 1 && (
              <div className="search-table-container">
                <h4 className="table-title">Vista de Tabla</h4>
                <table className="search-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Dirección</th>
                      <th>Teléfono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td className="code-cell">{customer.code}</td>
                        <td>{customer.name}</td>
                        <td>{customer.address || 'N/A'}</td>
                        <td>{customer.phone || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}


      </div>
    </div>
  );
};

export default SearchCustomers;
