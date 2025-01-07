import { getPool } from "../../config/database.js";


const getAllRestaurants = async () => {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.execute("SELECT * FROM restaurants");
    console.log("Restaurants fetched:", rows);
    return rows;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  } finally {
    connection.release();
  }
};

export { getAllRestaurants };