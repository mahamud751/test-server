import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orders: {
      type: Array,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
