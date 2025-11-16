import { pool } from '../database.js'

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    
    res.status(200).json({ message: `Usuario con ID: ${id} eliminado` });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};