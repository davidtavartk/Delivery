import express from "express";
import { getRestaurants } from "../controllers/restaurants/restaurantsController.js";
import { checkUserExists, getUsers} from "../controllers/users/userController.js";
import { registerUser, loginUser } from "../controllers/authentication/authenticationController.js";



const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, world from API routes file!");
});

// Get requests
router.get("/restaurants", getRestaurants);
router.get("/users", getUsers);

// Post requests
router.post('/users/check', checkUserExists);
router.post('/users/register', registerUser);
router.post('/users/login', loginUser);

export default router;
