import { Router } from "express";
import productController from "../controllers/productController";
import userMiddleware, { Role } from "../middleware/userMiddleware";
import multer from "multer";
import { storage } from "../middleware/multerMiddleware";

const router: Router = Router();
const upload = multer({ storage: storage });
router
  .route("/")
  .post(
    userMiddleware.isUserLoggedIn,
    userMiddleware.restrictTo(Role.Admin),
    upload.single("productImage"),
    productController.createProduct
  )
  .get(productController.getAllProducts);

router
  .route("/:id")
  .get(productController.getSingleProducts)
  .delete(
    userMiddleware.isUserLoggedIn,
    userMiddleware.restrictTo(Role.Admin),
    productController.deleteProducts
  );
export default router;
