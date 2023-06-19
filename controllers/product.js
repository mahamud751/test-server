import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Branch from "../models/Branch.js";

export const CreateProducts = async (req, res, next) => {
  try {
    const { name, categoryId, branchId, facility } = req.body;

    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find the branch by ID
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Create the product and assign it to the category, branch, and facilities
    const product = new Product({
      name,
      facility,
      category: category._id,
      branch: branch._id,
    });
    await product.save();

    // Add the product to the category's products array
    category.products.push(product._id);
    await category.save();

    // Add the product to the branch's products array
    branch.products.push(product._id);
    await branch.save();

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("category branch seat");
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getSingleProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category branch"
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProducts = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find the associated category
    const category = await Category.findById(product.category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find the associated branch
    const branch = await Branch.findById(product.branch);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Remove the product from the category's products array
    category.products.pull(productId);
    await category.save();

    // Remove the product from the branch's products array
    branch.products.pull(productId);
    await branch.save();

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProducts = async (req, res, next) => {
  try {
    const { name, categoryId, branchId, facility } = req.body; // Include facilityIds

    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find the branch by ID
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Create the product and assign it to the category, branch, and facilities
    const product = new Product({
      name,
      facility,
      category: category._id,
      branch: branch._id,
    });
    await product.save();

    // Add the product to the category's products array
    category.products.push(product._id);
    await category.save();

    // Add the product to the branch's products array
    branch.products.push(product._id);
    await branch.save();

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
