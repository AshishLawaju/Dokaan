import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../config/config";
import User from "../models/user.model";

export enum Role {
  Admin = "admin",
  Customer = "customer",
}

interface IExtendedRequest extends Request {
  user?: {
    username: string;
    email: string;
    role: string;
    id: string;
  };
}

class UserMiddleware {
  async isUserLoggedIn(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token1 = req.headers.authorization;
    const token = token1?.substring(7);
    if (!token) {
      res.status(404).json({ message: "No Token !!!" });
      return;
    }

    console.log(token);

    jwt.verify(
      token,
      envConfig.secretKey as string,
      async (err, result: any) => {
        if (err) {
          res.status(403).json({
            message: "Invalid Token",
          });
          console.log(err);

          return;
        } else {
          console.log(result);

          const userData = await User.findByPk(result.userId);
          if (userData) {
            req.user = userData;
          }
          next();
        }
      }
    );
  }

  restrictTo(...roles: Role[]) {
    return (req: IExtendedRequest, res: Response, next: NextFunction) => {
      let userRole = req.user?.role as Role;
    };
  }
}

export default new UserMiddleware();
