import { Router } from "express";
import UserController from "../controllers/userController";



const router = Router()



router.route("/register").post(UserController.register)
router.route("/login").post(UserController.login)
router.route("/forget-password").post(UserController.handleForgetPassword)

export default router