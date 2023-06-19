import mongoose from "mongoose";
const SeatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    seatNumber: {
      type: String,
    },
    desc: {
      type: String,
    },

    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Seat", SeatSchema);
