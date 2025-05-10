import { Router } from "express";
import categoryController from "../controllers/categoryController";
import UserMiddleware, { Role } from "../middleware/userMiddleware";
import userMiddleware from "../middleware/userMiddleware";


const router:Router = Router()




router.route("/").get(categoryController.getCategory).post(UserMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin),categoryController.addCategory)
router.route("/:id").patch(categoryController.updateCategory).delete(categoryController.deleteCategory)



export default router