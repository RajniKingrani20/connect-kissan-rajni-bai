import express from "express";
const router = express.Router();
import axios from "axios";

router.get("/:lng/:lat", async (req, res) => {
  var { lng, lat } = req.params;
  let url = `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=fO56C9HCbRktLBKD7vpk`;
  console.log(url);
  var response = await axios
    .get(
      `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=fO56C9HCbRktLBKD7vpk`
    )
    .then((rs) => {
      var features = rs.data.features;
      var streetData = features[0];
      var stateData = features[1];
      var countryData = features[2];
      var { center, place_name, place_type, text } = streetData;
      console.log(features);
      res.status(200).json({
        coordinates: center,
        place_name: place_name,
        place_type: place_type,
        province_name: stateData.text,
        province_place_name: stateData.place_name,
        street_address_text: text,
        country_name: countryData.text,
        all_features: features,
        message: "Geocoding data sent successfully!",
        status_code: 200,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
        statuscode: 400,
        data: "",
      });
    });
});

export default router;
