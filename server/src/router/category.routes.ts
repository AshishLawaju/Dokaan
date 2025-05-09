import { Router } from "express";
import categoryController from "../controllers/categoryController";
import UserMiddleware from "../middleware/userMiddleware";


const router:Router = Router()




router.route("/").get(categoryController.getCategory).post(UserMiddleware.isUserLoggedIn,categoryController.addCategory)
router.route("/:id").patch(categoryController.updateCategory).delete(categoryController.deleteCategory)



export default router