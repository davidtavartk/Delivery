import { getPool } from "../../config/database.js";

const deleteRestaurantsTable = async () => {
  const deleteTableQuery = `
        DROP TABLE IF EXISTS restaurants;
    `;
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    await connection.query(deleteTableQuery);
    console.log("Restaurants table deleted.");
  } finally {
    connection.release();
  }
};

const deleteUsersTable = async () => {
  const deleteTableQuery = `
        DROP TABLE IF EXISTS users;
    `;
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    await connection.query(deleteTableQuery);
    console.log("Users table deleted.");
  } finally {
    connection.release();
  }
};

export const deleteAllTables = async () => {
    await deleteRestaurantsTable();
    await deleteUsersTable();
    };
