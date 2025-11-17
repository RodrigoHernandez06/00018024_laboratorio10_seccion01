import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import '../styles/SalesReport.css';

const SalesReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'total_sales', direction: 'desc' });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await API.get('/sales/report');
      setReport(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar el reporte: ' + (err.response?.data?.message || err.message));
      setLoading(false);
      console.error('Error fetching report:', err);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedReport = () => {
    const sortedData = [...report].sort((a, b) => {
      const aValue = a[sortConfig.key] || 0;
      const bValue = b[sortConfig.key] || 0;

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return sortedData;
  };

  const calculateTotals = () => {
    const totalSales = report.reduce((sum, item) => sum + parseFloat(item.total_sales || 0), 0);
    const totalCount = report.reduce((sum, item) => sum + parseInt(item.sales_count || 0), 0);
    return { totalSales, totalCount };
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="report-loading">
        <div className="spinner"></div>
        <p>Generando reporte...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-error">
        <h3>⚠️ Error</h3>
        <p>{error}</p>
        <button onClick={fetchReport} className="retry-btn">
          Reintentar
        </button>
      </div>
    );
  }

  const sortedReport = getSortedReport();
  const totals = calculateTotals();

  return (
    <div className="sales-report-container">
      <div className="report-header">
        <h2 className="report-title">📊 Reporte de Ventas por Cliente</h2>
        <button onClick={fetchReport} className="refresh-btn">
          🔄 Actualizar
        </button>
      </div>

      <div className="summary-container">
        <div className="summary-card">
          <div className="summary-icon">👥</div>
          <div className="summary-content">
            <div className="summary-label">Total Clientes</div>
            <div className="summary-value">{report.length}</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">💰</div>
          <div className="summary-content">
            <div className="summary-label">Ventas Totales</div>
            <div className="summary-value">{formatCurrency(totals.totalSales)}</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">📦</div>
          <div className="summary-content">
            <div className="summary-label">Total Transacciones</div>
            <div className="summary-value">{totals.totalCount}</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">📈</div>
          <div className="summary-content">
            <div className="summary-label">Promedio por Cliente</div>
            <div className="summary-value">
              {report.length > 0 ? formatCurrency(totals.totalSales / report.length) : '$0.00'}
            </div>
          </div>
        </div>
      </div>

      {report.length === 0 ? (
        <div className="report-empty-state">
          <p className="empty-icon">📊</p>
          <h3>No hay datos para mostrar</h3>
          <p>No hay clientes con ventas registradas</p>
        </div>
      ) : (
        <>
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Ranking</th>
                  <th className="sortable" onClick={() => handleSort('customer_name')}>
                    Cliente {getSortIcon('customer_name')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('total_sales')}>
                    Total Ventas {getSortIcon('total_sales')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('sales_count')}>
                    N° Ventas {getSortIcon('sales_count')}
                  </th>
                  <th>Promedio por Venta</th>
                  <th>% del Total</th>
                </tr>
              </thead>
              <tbody>
                {sortedReport.map((item, index) => {
                  const avgPerSale = item.sales_count > 0 
                    ? parseFloat(item.total_sales) / parseInt(item.sales_count)
                    : 0;
                  const percentage = totals.totalSales > 0
                    ? (parseFloat(item.total_sales || 0) / totals.totalSales * 100).toFixed(1)
                    : 0;

                  return (
                    <tr key={item.customer_id}>
                      <td className="ranking-cell">
                        {index < 3 ? (
                          <span className="medal">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </span>
                        ) : (
                          <span className="rank-number">{index + 1}</span>
                        )}
                      </td>
                      <td className="customer-cell">
                        <div className="customer-info">
                          <div className="customer-name">{item.customer_name}</div>
                          <div className="customer-id">ID: {item.customer_id}</div>
                        </div>
                      </td>
                      <td className="amount-cell">
                        {formatCurrency(item.total_sales)}
                      </td>
                      <td className="count-cell">
                        <span className="badge">{item.sales_count}</span>
                      </td>
                      <td>
                        {formatCurrency(avgPerSale)}
                      </td>
                      <td>
                        <div className="percentage-bar">
                          <div 
                            className="percentage-fill"
                            style={{ width: `${percentage}%` }}
                          ></div>
                          <span className="percentage-text">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="tfoot-label">TOTALES</td>
                  <td className="tfoot-value">{formatCurrency(totals.totalSales)}</td>
                  <td className="tfoot-value">{totals.totalCount}</td>
                  <td className="tfoot-value">
                    {totals.totalCount > 0 
                      ? formatCurrency(totals.totalSales / totals.totalCount)
                      : '$0.00'
                    }
                  </td>
                  <td className="tfoot-value">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="info-box">
            <h4 className="info-title">ℹ️ Información del Reporte</h4>
            <ul className="info-list">
              <li>Los clientes están ordenados por total de ventas (de mayor a menor)</li>
              <li>Haz clic en los encabezados de columna para ordenar</li>
              <li>El porcentaje muestra la contribución de cada cliente al total</li>
              <li>Los tres mejores clientes están destacados con medallas</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesReport;