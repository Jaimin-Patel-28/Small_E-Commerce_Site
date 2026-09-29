import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  const products = await ProductModel.find();

  res.status(200).json({
    message: "All product fetched",
    products,
  });
};

const createProduct = async (req, res) => {
  const { name, description, price, stock, category, image } = req.body;

  const newProduct = await ProductModel.create({
    name,
    description,
    price,
    stock,
    category,
    image,
  });

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid product id",
    });
  }

  const product = await ProductModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    product,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category, image } = req.body;

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    { name, description, price, stock, category, image },
    { returnDocument: "after" },
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "Product updated", product: updatedProduct });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid product id",
    });
  }

  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    message: "Product delete successfully",
  });
};

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
