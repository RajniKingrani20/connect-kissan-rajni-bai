import express from "express";
const itemRoutes = express.Router();
import {
  getItems,
  getAllItems,
  setItem,
  updateItem,
  deleteItem,
  getItemByName,
} from "../controllers/itemController.js";
import protect from "../middleware/authMiddleware.js";

// More Clean Way
itemRoutes.route("/").get(protect, getItems).post(protect, setItem);
itemRoutes.route("/:id").put(protect, updateItem).delete(protect, deleteItem);
itemRoutes.route("/all").get(getAllItems);

itemRoutes.route("/single/:itemName").get(getItemByName);
// itemRoutes.get("/kk/", async (req, res) => {
//   var { itemName } = req.body;
//   console.log(itemName);

//   try {
//     var item = await Item.find({
//       itemName: itemName,
//     });

//     if (item) {
//       console.log("condition");
//       res.status(200).json({
//         item: item,
//         message: "Item sent!",
//         statuscode: 200,
//       });
//     } else {
//       res.status(400).json({
//         item: item,
//         message: "Item not foundp with provided name",
//         statuscode: 400,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error",
//       error: error,
//       statuscode: 500,
//     });
//   }
// });
export default itemRoutes;
