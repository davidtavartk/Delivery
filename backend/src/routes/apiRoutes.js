import express from "express";
import { getRestaurants } from "../controllers/restaurants/restaurantsController.js";



const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, world from API routes file!");
});

router.get("/restaurants", getRestaurants);

export default router;
