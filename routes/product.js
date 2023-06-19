import express from "express";
import {
  CreateProducts,
  deleteProducts,
  getProducts,
  getSingleProducts,
  updateProducts,
} from "../controllers/product.js";

const router = express.Router();

router.post("/", CreateProducts);
router.get("/", getProducts);
router.get("/:id", getSingleProducts);
router.delete("/:id", deleteProducts);
router.put("/:id/category", updateProducts);

export default router;
