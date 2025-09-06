import { getUserDb } from "../config/userdb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Register a new user
 */
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = getUserDb();

    // Check if email already exists
    const [existing] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.execute(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully", userId: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

/**
 * Login a user
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const db = getUserDb();

    // Find user
    const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    if (rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = rows[0];

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

/**
 * Get current logged-in user
 */
export async function me(req, res) {
  try {
    // user info attached by auth middleware
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const db = getUserDb();
    const [rows] = await db.execute(`SELECT id, name, email, createdAt FROM users WHERE id = ?`, [user.sub]);

    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}