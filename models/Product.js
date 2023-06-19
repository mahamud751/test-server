import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  seat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
    },
  ],

  photos: {
    type: [String],
  },
  facility: {
    type: [String],
  },
});

export default mongoose.model("Product", ProductSchema);
