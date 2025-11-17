import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import '../styles/NewSale.css';

const NewSale = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    id_customer: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoadingCustomers(true);
    setError('');
    try {
      const response = await API.get('/customers');
      setCustomers(response.data);
      setLoadingCustomers(false);
    } catch (err) {
      setError('Error al cargar clientes: ' + (err.response?.data?.message || err.message));
      setLoadingCustomers(false);
      console.error('Error fetching customers:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    if (!formData.id_customer) {
      setError('Por favor seleccione un cliente');
      setLoading(false);
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('El monto debe ser mayor a 0');
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('/sales', {
        amount: parseFloat(formData.amount),
        id_customer: parseInt(formData.id_customer)
      });

      setMessage('¡Venta registrada exitosamente! ID: ' + response.data.sale.id);
      setFormData({ amount: '', id_customer: '' });
      setLoading(false);

      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar la venta');
      setLoading(false);
      console.error('Error creating sale:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      if (value === '' || /^\d{0,}\.?\d{0,2}$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
    setMessage('');
    setError('');
  };

  const handleReset = () => {
    setFormData({ amount: '', id_customer: '' });
    setMessage('');
    setError('');
  };

  if (loadingCustomers) {
    return (
      <div className="sale-form-loading">
        <p>Cargando formulario...</p>
      </div>
    );
  }

  return (
    <div className="sale-form-container">
      <div className="sale-form-card">
        <h2 className="sale-form-title">Registrar Nueva Venta</h2>

        <form onSubmit={handleSubmit} className="sale-form">
          <div className="form-group">
            <label className="form-label">
              Cliente: <span className="required">*</span>
            </label>
            <select
              name="id_customer"
              value={formData.id_customer}
              onChange={handleChange}
              required
              className="form-select"
              disabled={loading}
            >
              <option value="">-- Seleccione un cliente --</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} ({customer.code})
                </option>
              ))}
            </select>
            {customers.length === 0 && (
              <small className="form-hint">
                No hay clientes disponibles. Por favor, registre clientes primero.
              </small>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Monto (USD): <span className="required">*</span>
            </label>
            <div className="input-group">
              <span className="input-prefix">$</span>
              <input
                type="text"
                name="amount"
                inputMode='decimal'
                min="0.01"
                value={formData.amount}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="0.00"
                disabled={loading}
              />
            </div>
            <small className="form-hint">
              Los campos marcados con * son obligatorios.
            </small>
          </div>

          <div className="button-group">
            <button
              type="submit"
              className={`form-button primary ${loading ? 'disabled' : ''}`}
              disabled={loading || customers.length === 0}
            >
              {loading ? 'Procesando...' : 'Registrar Venta'}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="form-button secondary"
              disabled={loading}
            >
              Limpiar
            </button>
          </div>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewSale;