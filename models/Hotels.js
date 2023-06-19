import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Premium", "Standard", "Normal"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  availble: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  fulldesc: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  perDay: {
    type: Number,
    required: true,
  },
  perMonth: {
    type: Number,
    required: true,
  },
  perYear: {
    type: Number,
    required: true,
  },
  bedroom: {
    type: Number,
    required: true,
  },
  bathroom: {
    type: Number,
    required: true,
  },
  car: {
    type: Number,
    required: true,
  },
  bike: {
    type: Number,
    required: true,
  },
  pet: {
    type: Number,
    required: true,
  },
  // category: {
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   id: {
  //     type: ObjectId,
  //     ref: "Category",
  //     required: true,
  //   },
  // },
});

export default mongoose.model("Hotel", HotelSchema);
