import { getPool } from "../../config/database.js";
import { restaurants } from "../dummyData/restaurants.js";
import {users} from "../dummyData/users.js";

const createRestaurantsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS restaurants (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      location VARCHAR(150),
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

const createUsersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone_number VARCHAR(30) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    const pool = getPool();
    const connection = await pool.getConnection();

    await connection.query(createTableQuery);
    connection.release();
    console.log("Users table created or already exists.");
}

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

  for (const user of users) {
    const { username, email, password, phone_number } = user;
    await connection.execute(
      "INSERT INTO users (username, email, password, phone_number) VALUES (?, ?, ?, ?)",
      [username, email, password, phone_number]
    );
    console.log(`Inserted: ${username}`);
  }

  connection.release();
};

export const createAllTablesData = async () => {
  console.log("Creating tables and inserting data...");
  try {
    await createRestaurantsTable();
    await createUsersTable();
    await insertFakeData();
    console.log("All tables created and data inserted.");
  } catch (error) {
    console.error("Error during creating tables and inserting data:", error);
  }
};
