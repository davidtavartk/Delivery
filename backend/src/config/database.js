import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { createAllTablesData } from '../models/scripts/createAllTables.js';
import { deleteAllTables } from '../models/scripts/deleteScripts.js';

dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const pool = mysql.createPool(dbConfig);

const initializeDatabase = async () => {
    try {
      // Comment createAllTablesData() after the first run to avoid duplicate data
        // await deleteAllTables();
        // await createAllTablesData();
    } catch (error) {
      console.error("Error setting up tables and data:", error);
      throw error;
    }
  };
  

export const connectToDatabase = async () => {
  try {
    await initializeDatabase();
    const connection = await pool.getConnection();
    console.log('DB connection is successful');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    throw err;
  }
};

export const getPool = () => pool;
