import { pool } from '../../database.js'

export const getSalesReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.name as customer_name,
        c.id as customer_id,
        SUM(s.amount) as total_sales,
        COUNT(s.id) as sales_count
      FROM customers c
      LEFT JOIN sales s ON c.id = s.id_customer
      GROUP BY c.id, c.name
      ORDER BY total_sales DESC NULLS LAST
    `)
    
    res.json(result.rows)
  } catch (error) {
    console.error('Get sales report error:', error)
    res.status(500).json({ message: 'Error generating report', error: error.message })
  }
}