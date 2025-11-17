import { pool } from '../../database.js'

export const createSale = async (req, res) => {
  try {
    const { amount, id_customer } = req.body

    const customerCheck = await pool.query(
      'SELECT id FROM customers WHERE id = $1',
      [id_customer]
    )

    if (customerCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Customer not found' })
    }

    const result = await pool.query(
      'INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING *',
      [amount, id_customer]
    )

    res.status(201).json({
      success: true,
      message: 'Sale created successfully',
      sale: result.rows[0]
    })
  } catch (error) {
    console.error('Create sale error:', error)
    res.status(500).json({ message: 'Error creating sale', error: error.message })
  }
}