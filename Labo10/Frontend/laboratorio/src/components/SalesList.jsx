import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import '../styles/SalesList.css';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await API.get('/sales');
      setSales(response.data);
      
      const total = response.data.reduce((sum, sale) => sum + parseFloat(sale.amount), 0);
      setTotalAmount(total);
      
      setLoading(false);
    } catch (err) {
      setError('Error al cargar ventas: ' + (err.response?.data?.message || err.message));
      setLoading(false);
      console.error('Error fetching sales:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="sales-list-loading">
        <div className="spinner"></div>
        <p>Cargando ventas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sales-list-error">
        <h3>⚠️ Error</h3>
        <p>{error}</p>
        <button onClick={fetchSales} className="retry-btn">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="sales-list-container">
      <div className="sales-header">
        <h2 className="sales-title">🛒 Lista de Ventas</h2>
        <button onClick={fetchSales} className="refresh-btn">
          🔄 Actualizar
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-label">Total de Ventas</div>
          <div className="stat-value">{sales.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Monto Total</div>
          <div className="stat-value">{formatCurrency(totalAmount)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Promedio por Venta</div>
          <div className="stat-value">
            {sales.length > 0 ? formatCurrency(totalAmount / sales.length) : '$0.00'}
          </div>
        </div>
      </div>

      {sales.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p>No hay ventas registradas</p>
          <p className="empty-hint">Las ventas aparecerán aquí una vez que sean registradas</p>
        </div>
      ) : (
        <div className="sales-table-container">
          <table className="sales-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>ID Cliente</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="id-cell">#{sale.id}</td>
                  <td className="amount-cell">{formatCurrency(sale.amount)}</td>
                  <td>{formatDate(sale.created_at)}</td>
                  <td className="customer-cell">{sale.customer_name}</td>
                  <td>{sale.id_customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesList;