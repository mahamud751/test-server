import mongoose from "mongoose";
const RoomsSchema = new mongoose.Schema(
  {
    name: String,
    seats: [seatSchema],
    bookedSeats: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Rooms", RoomsSchema);
