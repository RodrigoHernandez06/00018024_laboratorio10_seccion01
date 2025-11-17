import { pool } from '../../database.js'

export const getCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Get customers error:', error)
    res.status(500).json({ message: 'Error fetching customers', error: error.message })
  }
}