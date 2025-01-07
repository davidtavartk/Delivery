import { getAllRestaurants } from "../../models/restaurantModel/restaurantModel.js";

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    console.log("Returned restaurants:", restaurants);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants" });
  }
};

export { getRestaurants };
