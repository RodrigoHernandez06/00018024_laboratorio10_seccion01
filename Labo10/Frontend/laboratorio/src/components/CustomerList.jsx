import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import '../styles/CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/customers');
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar clientes: ' + (err.response?.data?.message || err.message));
      setLoading(false);
      console.error('Error fetching customers:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando clientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={fetchCustomers} className="retry-button">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="customer-list-container">
      <div className="header">
        <h2 className="title">Lista de Clientes</h2>
        <button onClick={fetchCustomers} className="refresh-button">
          Actualizar
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="empty-state">
          <p>No hay clientes registrados</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Código</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address || 'N/A'}</td>
                  <td>{customer.phone || 'N/A'}</td>
                  <td className="code-cell">{customer.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="footer">
            <p>Total de clientes: <strong>{customers.length}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
