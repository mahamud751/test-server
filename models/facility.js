import mongoose from "mongoose";
const Facilitychema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Facility", Facilitychema);
