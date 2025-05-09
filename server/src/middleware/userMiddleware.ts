import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../config/config";

class UserMiddleware {
  async isUserLoggedIn(
    req: Request,
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

    jwt.verify(token, envConfig.secretKey as string, async (err, result) => {
      if (err) {
        res.status(403).json({
          message: "Invalid Token",
        });
        console.log(err);

        return;
      } else {
        console.log(result);
        //@ts-ignore
        req.userId = result.userId;
        next();
      }
    });
  }
}

export default new UserMiddleware();
