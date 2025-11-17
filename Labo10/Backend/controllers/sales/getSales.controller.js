import { pool } from '../../database.js'

export const getSales = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id, 
        s.amount, 
        s.created_at, 
        s.id_customer,
        c.name as customer_name
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
      ORDER BY s.created_at DESC
    `)
    
    res.json(result.rows)
  } catch (error) {
    console.error('Get sales error:', error)
    res.status(500).json({ message: 'Error fetching sales', error: error.message })
  }
}