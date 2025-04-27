import { Router } from "express";


import userRouter from "./user.routers"


const mainRouter = Router();

// mainRouter.use("/user", userRouter);
mainRouter.use( userRouter);

export default mainRouter