import { getUserDb } from './userdb.js';
import bcrypt from 'bcrypt';

export async function seedUserData() {
  try {
    const userDb = getUserDb();

    // 1️⃣ Create Users table if not exists
    await userDb.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2️⃣ Check if any users exist
    const [rows] = await userDb.execute(`SELECT COUNT(*) as count FROM users`);
    if (rows[0].count === 0) {
      // Create a test user with hashed password
      const hashedPassword = await bcrypt.hash("password123", 10);

      await userDb.execute(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        ["Test User", "test@example.com", hashedPassword]
      );

      console.log("✅ Seeded 1 test user (email: test@example.com, password: password123)");
    } else {
      console.log(`ℹ️ Users table already has ${rows[0].count} records. Skipping user seed.`);
    }

  } catch (error) {
    console.error("❌ User seeding failed:", error);
    process.exit(1);
  }
}
