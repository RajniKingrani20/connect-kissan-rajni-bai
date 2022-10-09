import asyncHandler from "express-async-handler";
import Item from "../models/itemSchema.js";
import User from "../models/authSchema.js";

// @desc   Get Items
// @route  GET api/items
// @access Private for Only Authorized User
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user.id });
  res.status(200).json(items);
});

const getItemByName = asyncHandler(async (req, res) => {
  var itemName = req.params.itemName;
  console.log(itemName);

  try {
    var item = await Item.find({
      itemName: itemName,
    });

    if (item) {
      res.status(200).json({
        item: item,
        message: "Item sent!",
        statuscode: 200,
      });
    } else {
      res.status(400).json({
        item: item,
        message: "Item not found with provided name",
        statuscode: 400,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
      statuscode: 500,
    });
  }
});

// @desc   Get Items
// @route  GET api/items/all
// @access Public for every client
const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  // const user = await User.find({ user: items.user });
  res.status(200).json(items);
});

// @desc   Set Item
// @route  POST api/item
// @access Private
const setItem = asyncHandler(async (req, res) => {
  const {
    itemName,
    itemDetails,
    itemPrice,
    itemType,
    itemImg,
    itemUserName,
    itemUserPhone,
  } = req.body;
  if (!itemName || !itemDetails || !itemPrice || !itemType) {
    res.status(400);
    throw new Error("Please add an item careFully");
  }

  const item = await Item.create({
    user: req.user.id,
    itemName,
    itemDetails,
    itemPrice,
    itemType: itemType.toLowerCase(),
    itemImg,
    itemUserName,
    itemUserPhone,
  });
  res.status(200).json(item);
});

// @desc   Update Item
// @route  PUT api/item/:id
// @access Private
const updateItem = asyncHandler(async (req, res) => {
  res.status(200);
});

// @desc   Delete Items
// @route  DELETE api/item/:id
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }
  //Validate User, So user can only delete his item
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (item.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await item.remove();
  res.status(200).json({ id: req.params.id });
});

export {
  getItems,
  getAllItems,
  setItem,
  updateItem,
  deleteItem,
  getItemByName,
};
