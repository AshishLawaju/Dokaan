import { Router } from "express";
import categoryController from "../controllers/categoryController";


const router:Router = Router()




router.route("/").get(categoryController.getCategory).post(categoryController.addCategory)
router.route("/:id").patch(categoryController.updateCategory).delete(categoryController.deleteCategory)