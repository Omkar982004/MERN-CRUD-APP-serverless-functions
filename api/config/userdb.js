import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let userConnection;

/**
 * Initialize MySQL connection (User DB)
 */
export async function connectUserDb() {
  try {
    userConnection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT
    });

    console.log('✅ MySQL UserDB connected');
  } catch (error) {
    console.error('❌ MySQL UserDB connection failed:', error);
    process.exit(1);
  }
}

/**
 * Get active MySQL connection (User DB)
 */
export function getUserDb() {
  if (!userConnection) {
    throw new Error('UserDB not initialized. Call connectUserDb() first.');
  }
  return userConnection;
}
