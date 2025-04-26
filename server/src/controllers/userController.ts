import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateToken from "../services/generateToken";
import generateOTP from "../services/OTPgenerator";
import sendMail from "../services/sendMail";

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
       res.status(400).json({
        message: "Please provide email and password",
      });
      return
    }

    const [user] = await User.findAll({   
      //returns in array find --> findall in seq , findByID --> findByPK
      where: {
        email: email,
      },
    });

    if (!user) 
    {

      res.status(404).json({ message: "User not found" });
      return
    }

    const isEqual = bcrypt.compareSync(password, user.password);

    if (!isEqual){

      res.status(404).json({ messgae: "Invalid Credenitals" });
      return
    }

    const token = generateToken(user.id);

     res.status(200).json({ success: "true", token });
     return
  }


  static async handleForgetPassword(req:Request,res:Response){
    const {email} =req.body
    if(!email) 
    {

      res.status(400).json({success:false ,message:"no email found!"})
      return
    }


    const [user] =   await User.findAll({
        where:{
          email:email
        }
      })

      if(!user) {

        res.status(400).json({success:false , message:"Invalid email"})
        return
      } 

        const otp = generateOTP()

        sendMail({
          to:email,
          subject:"Dookan Password Reset Request",
          text:`Reset your password using OTP :  ${otp} `

        })

        res.status(200).json({message:"OTP send"})
        return



  }
}

export default UserController;
