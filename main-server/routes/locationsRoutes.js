import express from "express";
const router = express.Router();
// const locationSchema = require("../models/locations");
import locationSchema from "../models/locations.js";

router.get("/", async (req, res) => {
  try {
    var locations = await locationSchema.find();
    if (locations && locations.length > 0) {
      res.status(200).json({
        locations: locations,
        status: "200",
        message: "Locations sent success!",
      });
    } else {
      res.status(404).json({
        data: [],
        status: 404,
        message: "No locations available in database!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: 500,
      errormessage: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    var { lat, lng } = req.body;

    var location = new locationSchema({
      lat: lat,
      lng: lng,
    });

    var savedLocation = await location.save();

    res.status(200).json({
      message: "new location saved",
      status: 200,
      savedLocation: savedLocation,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
});

export default router;
