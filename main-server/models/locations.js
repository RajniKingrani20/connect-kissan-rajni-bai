import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

var locations = mongoose.model("locations", locationSchema);

export default locations;
