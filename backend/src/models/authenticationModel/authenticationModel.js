import { getPool } from "../../config/database.js";

export const findUserByPhone = async (phone) => {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE phone_number = ?",
      [phone]
    );
    return rows;
  } catch (error) {
    console.error("Error finding user by phone:", error);
    throw error;
  } finally {
    connection.release();
  }
};

export const findUserByEmail = async (email) => {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  } finally {
    connection.release();
  }
};

export const findUserByUsername = async (username) => {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return rows;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  } finally {
    connection.release();
  }
};

export const insertUser = async (phone, username, email, hashedPassword) => {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.execute(
      "INSERT INTO users (phone_number, username, email, password) VALUES (?, ?, ?, ?)",
      [phone, username, email, hashedPassword]
    );
    return result;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  } finally {
    connection.release();
  }
};