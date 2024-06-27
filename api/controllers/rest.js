import Restaurant from "../models/Restaurant.js";
import Admin from "../models/Admin.js";

export const createRestaurant = async (req, res, next) => {
  const adminId = req.body.admin; 
  const newRestaurant = new Restaurant(req.body);
  try {
    const savedRestaurant = await newRestaurant.save();
    await Admin.findOneAndUpdate(
      { _id: adminId },
      { $set: { rest: savedRestaurant._id } },
      { new: true }
    );
    res.status(200).json(savedRestaurant);
  } catch (err) {
    next(err);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};


export const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const getRestaurants = async (req, res, next) => {
  try {
    const rests = await Restaurant.find();
    res.status(200).json(rests);
  } catch (err) {
    next(err)
  }
}