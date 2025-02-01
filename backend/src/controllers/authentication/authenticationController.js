import { getPool } from "../../config/database.js";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  findUserByPhone,
  findUserByUsername,
  insertUser,
} from "../../models/authenticationModel/authenticationModel.js";
import { comparePassword, hashPassword } from "../../utils/hashPassword.js";

export const registerUser = async (req, res) => {
  const { phone, username, email, password } = req.body;
  try {
    const phoneExists = await findUserByPhone(phone);
    if (phoneExists.length > 0) {
      return res
        .status(400)
        .json({ field: "phone", message: "Phone number is already taken" });
    }

    const emailExists = await findUserByEmail(email);
    if (emailExists.length > 0) {
      return res
        .status(400)
        .json({ field: "email", message: "Email already exists" });
    }

    const usernameExists = await findUserByUsername(username);
    if (usernameExists.length > 0) {
      return res
        .status(400)
        .json({ field: "username", message: "Username already exists" });
    }

    // If all checks pass, proceed with user registration
    const hashedPassword = await hashPassword(password);
    const result = await insertUser(phone, username, email, hashedPassword);

    return res.status(200).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const users = await findUserByPhone(phone);
    const user = users[0];
    console.log("USER FOUND by Phone:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Password:", password, "User Password:", user.password);
    const passwordMatches = await comparePassword(password, user.password);
    if (!passwordMatches) {
      return res.status(403).json({ message: "Invalid Password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone_number,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    //   secure: false,
    }); 

    console.log("SUCCESFULL")
    console.log(token)
    res.status(200).json({ message: "Login successful", user: payload });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
