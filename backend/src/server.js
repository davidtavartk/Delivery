import express from "express";
import { connectToDatabase } from "./config/database.js";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js";

const startServer = async () => {
  try {
    await connectToDatabase();
    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('public'));


    app.use("/", apiRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  }
};

startServer();
