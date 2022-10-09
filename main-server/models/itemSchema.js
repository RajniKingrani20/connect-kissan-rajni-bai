import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    itemName: {
      type: String,
      required: [true, "Please provide item name"],
    },
    itemDetails: {
      type: String,
      required: [true, "Please provide relevant details"],
    },
    itemType: {
      type: String,
      required: [true, "Please provide relevant type"],
    },
    itemPrice: {
      type: String,
      required: [true, "Please provide price"],
    },
    itemImg: {
      type: String,
    },
    itemUserName: {
      type: String,
    },
    itemUserPhone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var Item = mongoose.model("Item", itemSchema);

export default Item;
