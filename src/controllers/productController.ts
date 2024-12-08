import { Request, Response } from "express";
import {
  _addProduct,
  _deleteProduct,
  _getAllProducts,
  _updateProduct,
} from "../services/productService";
import { IImage } from "../models/product";

// @desc get all products
// @route GET /api/products
// @access
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await _getAllProducts();

    res.status(200).json({ products: products });
  } catch (error) {
    console.error("Product retrieval error: ", error);
    res
      .status(500)
      .json({ message: "An error occured, please try again later" });
  }
};

// @desc create new product
// @route POST /api/products
// @access
export const addProduct = async (req: Request, res: Response) => {
  try {
    let images: IImage[] = [];

    console.log(req);

    if (req.files) {
      images = (req.files as Express.Multer.File[]).map(
        (file: Express.Multer.File) => {
          return {
            data: file.buffer,
            contentType: file.mimetype,
          };
        }
      );
    }

    const addedProduct = await _addProduct(
      req.body.sku,
      req.body.quantity,
      req.body.name,
      images,
      req.body.description
    );

    if (addedProduct) {
      res.status(201).json(addedProduct);
      return;
    }

    res.status(400).json({ message: "Product with this SKU already exist" });
  } catch (error) {
    console.error("Product creation error: ", error);
    res
      .status(500)
      .json({ message: "An error occured, please try again later" });
  }
};

// @desc update a product
// @route PUT /api/products/:id
// @access
export const updateProduct = async (req: Request, res: Response) => {
  const sku = req.params.id;

  let images: IImage[] = [];

  if (req.files) {
    images = (req.files as Express.Multer.File[]).map(
      (file: Express.Multer.File) => {
        return {
          data: file.buffer,
          contentType: file.mimetype,
        };
      }
    );
  }

  try {
    if (sku) {
      const updatedProduct = await _updateProduct(
        sku,
        req.body.sku,
        Number(req.body.quantity),
        req.body.name,
        images,
        req.body.description
      );

      if (updatedProduct) {
        res.status(201).json(updatedProduct);
        return;
      }

      res.status(400).json({ message: "Product with new SKU already exist" });
      return;
    }
    res.status(400).json({ message: "Invalid request" });
    return;
  } catch (error) {
    console.error("Product update error: ", error);
    res
      .status(500)
      .json({ message: "An error occured, please try again later" });
  }
};

// @desc delete a product
// @route DELETE /api/products/:id
// @access
export const deleteProduct = async (req: Request, res: Response) => {
  const sku = req.params.id;

  try {
    if (sku) {
      const deletedProduct = await _deleteProduct(sku);

      if (deletedProduct) {
        res.status(200).json({
          id: deletedProduct.sku,
        });
        return;
      }
    }

    res.status(400).json({ message: "Product with this SKU does not exist" });
  } catch (error) {
    console.error("Product deletion error: ", error);
    res
      .status(500)
      .json({ message: "An error occured, please try again later" });
  }
};
