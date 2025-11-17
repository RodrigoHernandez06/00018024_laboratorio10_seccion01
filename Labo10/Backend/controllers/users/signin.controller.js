import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../../database.js";
import { JWT_SECRET } from "../../keys.js";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const resultFind = result.rows;
    if (resultFind.length < 1) {
      return res.status(400).json({ message: "Invalid user find" });
    }

    const userFind = resultFind[0];
    
    const isPasswordValid = await bcrypt.compare(password, userFind.password);
        
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const _jwt = jwt.sign({ id: userFind.id }, JWT_SECRET, {
      expiresIn: "8h",
    });

    return res
      .status(200)
      .json({ success: true, message: "user finded", _jwt, userFind });
  } catch (error) {
    console.error('Sign in error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};