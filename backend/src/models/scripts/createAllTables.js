import { getPool } from "../../config/database.js";
import { restaurants } from "../dummyData/restaurants.js";

const createRestaurantsTable = async () => {
  console.log("Starting");
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS restaurants (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      location VARCHAR(255),
      rating FLOAT,
      delivery_available BOOLEAN,
      image VARCHAR(255)
    );
  `;
  const pool = getPool();
  const connection = await pool.getConnection();

  await connection.query(createTableQuery);
  connection.release();
  console.log("Restaurants table created or already exists.");
};

const insertFakeData = async () => {
  const pool = getPool();
  const connection = await pool.getConnection();

  for (const restaurant of restaurants) {
    const { name, description, location, rating, delivery_available, image } =
      restaurant;
    await connection.execute(
      "INSERT INTO restaurants (name, description, location, rating, delivery_available, image) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, location, rating, delivery_available, image]
    );
    console.log(`Inserted: ${name}`);
  }

  connection.release();
};

export const createAllTablesData = async () => {
  console.log("Creating tables and inserting data...");
  try {
    await createRestaurantsTable();
    await insertFakeData();
    console.log("All tables created and data inserted.");
  } catch (error) {
    console.error("Error during creating tables and inserting data:", error);
  }
};
