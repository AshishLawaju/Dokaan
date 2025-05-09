import { Router } from "express";


import userRouter from "./user.routers"
import categoryRouter from "./category.routes"

const mainRouter = Router();

// mainRouter.use("/user", userRouter);
mainRouter.use( userRouter);
mainRouter.use("/category",categoryRouter)
export default mainRouter