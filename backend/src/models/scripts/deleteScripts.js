import { getPool } from "../../config/database.js";

export const deleteRestaurantsTable = async () => {
    const deleteTableQuery = `
        DROP TABLE IF EXISTS restaurants;
    `;
    const pool = getPool();
    const connection = await pool.getConnection();

    
    await connection.query(deleteTableQuery);
    console.log("Restaurants table deleted.");
    connection.release();
    }

