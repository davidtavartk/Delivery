import { getPool } from "../../config/database.js";

const getAllUsers = async () => {
    const pool = getPool();
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute("SELECT * FROM users");
        console.log("Users fetched:", rows);
        return rows;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
    finally {
        connection.release();
    }
}

export const findUserByPhone = async (phone) => {
  const query = 'SELECT * FROM users WHERE phone_number = ?';
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.execute(query, [phone]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error finding user by phone:', error);
    throw error;
  } finally {
    connection.release();
  }
};


export {getAllUsers};