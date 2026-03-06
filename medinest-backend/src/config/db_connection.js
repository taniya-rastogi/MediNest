// src/config/db_connection.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT), // number of parallel connections allowed
  queueLimit: 0
});

// Convert callbacks to promises (modern syntax)
const db = pool.promise();

// Test connection
//(Immediately Invoked Async Function Expression) async/await + IIFE
(async () => {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('MySQL connected successfully');
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
  }
})();

module.exports = db;
