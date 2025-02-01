import { findUserByPhone, getAllUsers } from "../../models/userModel/userModel.js";

const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        console.log("Returned users:", users);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
}

export const checkUserExists = async (req, res) => {
    const { phone } = req.body;
  
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
  
    try {
      const user = await findUserByPhone(phone);
      if (user) {
        return res.status(200).json({ exists: true, user });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

export { getUsers };
