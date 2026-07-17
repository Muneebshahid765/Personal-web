import mysql from 'mysql2/promise';

// Read env variables
import * as dotenvSafe from 'dotenv';
dotenvSafe.config();

let pool: mysql.Pool | null = null;
let isConnected = false;

export async function getDbConnection() {
  const host = process.env.DB_HOST || '';
  const user = process.env.DB_USER || '';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || '';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  if (!host || !user || !database) {
    console.warn('⚠️ SQL DATABASE CONFIGURATION MISSING: DB_HOST, DB_USER, or DB_NAME are not specified in the environment variables. Backend is running in FALLBACK MODE using mock data.');
    return null;
  }

  if (pool) {
    return pool;
  }

  try {
    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });

    // Test connection
    const conn = await pool.getConnection();
    conn.release();
    isConnected = true;
    console.log('🚀 SUCCESS: Connected to MySQL database via cPanel configuration!');
    return pool;
  } catch (error) {
    console.warn('⚠️ DATABASE CONNECTION INFO: Could not connect to cPanel SQL database.', error.message);
    console.warn('⚠️ Backend is running in FALLBACK MODE using mock data to keep the application live and functional.');
    pool = null;
    return null;
  }
}

// Helper to execute safe queries with fallback
export async function executeQuery<T>(query: string, params: any[] = []): Promise<T[] | null> {
  const db = await getDbConnection();
  if (!db) return null;
  try {
    const [rows] = await db.execute(query, params);
    return rows as T[];
  } catch (err) {
    console.error(`Error executing query: ${query}`, err.message);
    return null;
  }
}