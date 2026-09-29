import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";
import authenticate from "../middleware/authenticate.js";
import {
  createProductValidator,
  productIdValidator,
  updateProductValidator,
} from "../validators/product.validator.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", authenticate, createProductValidator, validate, createProduct);

router.get("/:id", productIdValidator, validate, getProductById);

router.put(
  "/:id",
  authenticate,
  updateProductValidator,
  validate,
  updateProduct,
);

router.delete(
  "/:id",
  authenticate,
  productIdValidator,
  validate,
  deleteProduct,
);

export default router;
