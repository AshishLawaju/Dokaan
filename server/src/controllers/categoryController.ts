import { Request, Response } from "express";
import Category from "../models/category.model";

class categoryController {
  categoryData = [
    {
      categoryName: "Electronic",
    },
    {
      categoryName: "Groceries",
    },
    {
      categoryName: "Foods",
    },
  ];
  async seedCategory(): Promise<void> {
    const data = await Category.findAll();
    if (data.length === 0) {
      await Category.bulkCreate(this.categoryData);
      console.log("Category data seed successful");
    } else {
      console.log("Category data already seeds");
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    const { categoryName } = req.body;
    console.log(categoryName);
    
    if (!categoryName) {
      res.status(400).json({
        success: false,
        message: "please provide category name",
      });
      return
    }
    await Category.create({categoryName:categoryName});

    res.status(200).json({
      success: true,
      message: "New category Added",
    });
  }

  async getCategory(req: Request, res: Response): Promise<void> {
    const data = await Category.findAll();
    if (data.length == 0) {
      res.status(404).json({
        message: "no category ",
      });
    }

    res.status(200).json({
      sucess: true,
      data,
    });
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(404).json({
        message: "Id is required",
      });
    }

    const data = await Category.findAll({
      where: {
        id: id,
      },
    });

    if (data.length == 0) {
      res.status(404).json({
        message: "invalid category id",
      });
    }

    await Category.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "category delete sucessful",
    });
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { categoryName } = req.body;

    if (!id) {
      res.status(404).json({
        message: "Id is required",
      });
    }

    const data = await Category.findAll({
      where: {
        id: id,
      },
    });

    if (data.length == 0) {
      res.status(404).json({
        message: "invalid category id",
      });
    }

    await Category.update(
      {
        categoryName: categoryName,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({
      message: "category updated",
    });
  }
}

export default new categoryController();
