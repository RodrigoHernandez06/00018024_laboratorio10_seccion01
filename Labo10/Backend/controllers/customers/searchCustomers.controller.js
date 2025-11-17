import { pool } from '../../database.js'

export const searchCustomers = async (req, res) => {
  try {
    const { code } = req.query
    
    if (!code) {
      return res.status(400).json({ message: 'Code parameter is required' })
    }

    const result = await pool.query(
      'SELECT * FROM customers WHERE code = $1',
      [code]
    )
    
    res.json(result.rows)
  } catch (error) {
    console.error('Search customers error:', error)
    res.status(500).json({ message: 'Error searching customers', error: error.message })
  }
}