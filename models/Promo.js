import mongoose from "mongoose";

const PromoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    photos: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Promo", PromoSchema);
