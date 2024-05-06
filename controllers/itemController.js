const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

// Display list of all items.
exports.item_list = asyncHandler(async (req, res) => {
  const items = await Item.find().exec();
  res.render("item_list", { title: "Items", items });
});

// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.render("item_form", { title: "Create Item", categories });
});

// Handle item create on POST.
exports.item_create_post = [
  // Validate and sanitize fields
  body("name", "Item name is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Item description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category is required").trim().isLength({ min: 1 }).escape(),
  body("price", "Invalid price").isNumeric(),
  body("numberInStock", "Invalid number in stock").isInt(),

  // Process request after validation and sanitization
  asyncHandler(async (req, res) => {
    // Extract validation errors
    const errors = validationResult(req);

    // If there are validation errors, render form with error messages
    if (!errors.isEmpty()) {
      return res.render("item_form", {
        title: "Create Item",
        errors: errors.array(),
      });
    }

    // If no validation errors, create a new item
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      URL: req.body.URL, // Optional field
    });

    // Save the new item to the database
    await newItem.save();
    res.redirect("/items"); // Redirect to item list page after successful creation
  }),
];

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).exec();
  if (!item) {
    return res.send("Item not found");
  }
  res.render("item_delete", { title: "Delete Item", item });
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res) => {
  // Delete item
  // Redirect to item list
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).exec();
  if (!item) {
    return res.send("Item not found");
  }
  res.render("item_form", { title: "Update Item", item });
});

// Handle item update on POST.
exports.item_update_post = [
  // Validation and sanitization
  // ...
  asyncHandler(async (req, res) => {
    // Process request after validation and sanitization
    // ...
  }),
];

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).exec();
  if (!item) {
    return res.send("Item not found");
  }
  res.render("item_detail", { title: "Item Detail", item });
});
