import { pool } from '../database.js'
import { generateHash } from '../utils/hashes/index.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../keys.js'

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before storing
    const hashGenerated = await generateHash(password);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashGenerated]
    );

    const userFind = result.rows[0];
    const _jwt = jwt.sign({ id: userFind.id }, JWT_SECRET, {
      expiresIn: "8h",
    });

    return res
      .status(201)
      .json({
        success: true,
        message: `User added with ID: ${JSON.stringify(userFind)}`,
        _jwt,
        userFind,
      });
  } catch (error) {
    console.error('Create user error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};