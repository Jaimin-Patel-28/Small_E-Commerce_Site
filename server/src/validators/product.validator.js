import { body, param } from "express-validator";

const productIdValidator = [
  param("id").isMongoId().withMessage("Invalid product id"),
];

const createProductValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a number >= 0"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a whole number >= 0"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("image").optional().isURL().withMessage("Image must be a valid URL"),
];

const updateProductValidator = [
  ...productIdValidator,
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a number >= 0"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a whole number >= 0"),
  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),
  body("image").optional().isURL().withMessage("Image must be a valid URL"),
];

export { productIdValidator, createProductValidator, updateProductValidator };
