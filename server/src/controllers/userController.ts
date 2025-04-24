import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateToken from "../services/generateToken";

class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({
          message: "Please provide username email password",
        });
      }
      const hash = await bcrypt.hash(password, 10);
      await User.create({
        username,
        email,
        password: hash,
      });

      res.status(200).json({
        message: "User registered successful.",
      });
    } catch (error) {}
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const [user] = await User.findAll({
      //returns in array find --> findall in seq , findByID --> findByPK
      where: {
        email: email,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isEqual = bcrypt.compareSync(password, user.password);

    if (!isEqual)
      return res.status(404).json({ messgae: "Invalid Credenitals" });

    const token = generateToken(user.id);

    return res.status(200).json({ success: "true", token });
  }
}

export default UserController;
