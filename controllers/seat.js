import Seat from "../models/Seat.js";
import Product from "../models/Product.js";

export const createSeat = async (req, res, next) => {
  try {
    const { name, productId } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create the seat and assign it to the product
    const seat = new Seat({ name, products: product._id });
    await seat.save();

    // Add the seat to the product's seats array
    product.seat.push(seat._id);
    await product.save();

    res.status(201).json(seat);
  } catch (err) {
    next(err);
  }
};

export const getSeats = async (req, res, next) => {
  try {
    const seats = await Seat.find({}).populate("products");
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
};

export const getSingleSeat = async (req, res, next) => {
  try {
    const result = await Seat.findById(req.params.id).populate("products");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteSeat = async (req, res, next) => {
  try {
    const seatId = req.params.id;

    // Find the seat by ID
    const seat = await Seat.findById(seatId);
    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    // Find the associated product
    const product = await Product.findById(seat.products);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Remove the seat from the product's seats array
    product.seat.pull(seatId);
    await product.save();

    // Delete the seat
    await Seat.findByIdAndDelete(seatId);

    res.status(200).json(seat);
  } catch (err) {
    next(err);
  }
};

export const updateSeat = async (req, res, next) => {
  try {
    const { productId, name, photos } = req.body;
    const seatId = req.params.id;

    // Find the seat by ID
    const seat = await Seat.findById(seatId);
    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    // Check if the product has changed
    if (seat.products.toString() === productId) {
      // Product remains the same, no need to update
      return res.json(seat);
    }

    // Find the previous product
    const previousProduct = await Product.findById(seat.products);
    if (!previousProduct) {
      return res.status(404).json({ error: "Previous product not found" });
    }

    // Remove the seat from the previous product's seats array
    previousProduct.seat.pull(seatId);
    await previousProduct.save();

    // Find the new product
    const newProduct = await Product.findById(productId);
    if (!newProduct) {
      return res.status(404).json({ error: "New product not found" });
    }

    // Update the seat's product
    seat.products = productId;

    // Add the seat to the new product's seats array
    newProduct.seat.push(seatId);
    await newProduct.save();

    // Update other fields if provided
    if (name) {
      seat.name = name;
    }
    if (photos) {
      seat.photos = photos;
    }
    await seat.save();

    res.json(seat);
  } catch (err) {
    next(err);
  }
};
