import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import orderRoute from "./routes/order.js";
import categoryRoute from "./routes/category.js";
import facilityRoute from "./routes/facility.js";
import branchRoute from "./routes/branch.js";
import productsRoute from "./routes/product.js";
import seatRoute from "./routes/seat.js";
import recommendedRoute from "./routes/recommended.js";
import promoRoute from "./routes/promo.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("successfully connect with mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/category", categoryRoute);
app.use("/api/facility", facilityRoute);
app.use("/api/branch", branchRoute);
app.use("/api/recommended", recommendedRoute);
app.use("/api/promo", promoRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/order", orderRoute);
app.use("/api/products", productsRoute);
app.use("/api/seat", seatRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5001, () => {
  connect();
  console.log("connect with backend");
});
