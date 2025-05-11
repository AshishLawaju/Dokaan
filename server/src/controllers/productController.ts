import { Request, Response } from "express";
import Category from "../models/category.model";
import Product from "../models/product.model";

// interface IExtendedRequest extends Request {
//   file?: {
//     filename: string;
//     filedname: string;
//   };
// }

class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    const {
      productName,
      productDescription,
      productPrice,
      productTotalStock,
      productDiscount,
      productCategoryId,
    } = req.body;

    const filename = req.file ? req.file : "https://www.svgrepo.com/show/452030/avatar-default.svg";

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productTotalStock ||
      !productCategoryId
    ) {
      res.status(403).json({
        message:
          "require   productName,    productDescription,    productPrice,    productTotalStock,      categoryId",
      });
      return;
    }

    await Product.create({
      productName,
      productDescription,
      productPrice,
      productTotalStock,
      productDiscount: productDiscount || 0,
      CategoryId: productCategoryId,
      productPhoto : filename

    });

    res.status(200).json({
      messgae: "Product created successful",
    });
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    const data = await Product.findAll({
      include: [
        {
          model: Category,
          attributes:['id','categoryName']
        },
      ],
    });

    res.status(200).json({
      messgae: "Products fetched successful",
      data,
    });
  }

  async getSingleProducts(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const data = await Product.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: Category,
          attributes:['id','categoryName']

        },
      ],
    });

    if (data.length == 0) {
      res.status(200).json({
        messgae: "no product  found",
        data,
      });
    }
    res.status(200).json({
      messgae: "Products  found",
      data,
    });
  }

  async deleteProducts(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const data = await Product.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: Category,
        },
      ],
    });

    if (data.length == 0) {
      res.status(200).json({
        messgae: "no product  found",
        data,
      });
      return;
    }

    await Product.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      messgae: "Products deleted  successfuly ",
      data,
    });
  }
  async updateProduct(): Promise<void> {}
}

export default new ProductController();
