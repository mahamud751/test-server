import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

router.get("/:id", getHotel);
router.get("/", getHotels);
// router.get("/all", getHotelsAll);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;

// {
//   "name":"hotel 2",
//   "type":"hotel",
//   "city":"spain",
//   "address":"122 paris",
//   "distance":"200",
//   "title":"Best Hotel in the city",
//   "desc":"Best hotel",
//   "cheapestPrice":200
// }
