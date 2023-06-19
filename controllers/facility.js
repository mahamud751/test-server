import Facility from "../models/facility.js";
export const createFacility = async (req, res, next) => {
  const newPromo = new Facility(req.body);
  try {
    const promo = await newPromo.save();
    res.status(200).json(promo);
  } catch (err) {
    next(err);
  }
};
export const getFacility = async (req, res, next) => {
  try {
    const facility = await Facility.find({});
    res.status(200).json(facility);
  } catch (err) {
    next(err);
  }
};
export const getSingleFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id).populate("hotels");
    res.status(200).json(facility);
  } catch (err) {
    next(err);
  }
};
export const deleteFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    res.status(200).json(facility);
  } catch (err) {
    next(err);
  }
};

export const updateFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(facility);
  } catch (err) {
    next(err);
  }
};
