import Reservation from "../models/Reservation.js";
import Restaurant from "../models/Restaurant.js";
import { slots } from "../data.js";

export const checkAvailableSlots = async(req, res, next) => {
  const date = req.params.date;
  const restId = req.params.id;
  try {
    const reservations = await Reservation.find({
      rest: restId,
      date: {$eq: new Date(date)} 
    });

    const reservedSlots = reservations.map(reservation => reservation.slot);
    const availableSlots = slots.filter(slot => !reservedSlots.includes(slot));
    res.status(200).json(availableSlots);
  }
  catch(err) {
    next(err)
  }
}

export const createReservation = async (req, res, next) => {

  const newRes = new Reservation(req.body);
  try {
    const reservation = await newRes.save();
    res.status(200).json(reservation);

  } catch (err) {
    next(err);
  }
};

// function to cancel reservation
export const deleteReservation = async (req, res, next) => {
  const resId = req.params.id;
  try {
    await Reservation.findByIdAndDelete(resId);
    res.status(200).json("Deleted Successfully");
  } catch (err) {
    next(err);
  }
};

// Function to get reservations by user ID
export const getReservationsByUserId = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const reservations = await Reservation.find({ author: userId }).populate('rest', 'name');
    res.status(200).json(reservations);
  } catch (error) {
    next(err);
  }
};

// Function to get reservations by user ID
export const getReservationsByRestId = async (req, res, next) => {
  const restId = req.params.id;
  try {
    const reservations = await Reservation.find({ rest: restId }).populate('rest', 'name');
    res.status(200).json(reservations);
  } catch (error) {
    next(err);
  }
};