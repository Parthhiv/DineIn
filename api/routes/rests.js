import express from "express";
import {
  createRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
} from "../controllers/rest.js";

const router = express.Router();

router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.get("/:id", getRestaurant);
router.get("/", getRestaurants);

export default router;