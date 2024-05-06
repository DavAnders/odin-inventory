const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Get all categories - Display list of all categories.
exports.category_list = asyncHandler(async (req, res) => {
  const list_categories = await Category.find()
    .sort([["name", "ascending"]])
    .exec();
  res.render("category_list", {
    title: "Category List",
    category_list: list_categories,
  });
});

// Display Category create form on GET.
exports.category_create_get = function (req, res) {
  res.render("category_form", { title: "Create Category" });
};

// Handle Category create on POST.
exports.category_create_post = [
  // Validate and sanitise fields.
  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("URL")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid URL")
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      URL: req.body.URL,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: req.body,
        errors: errors.array(),
      });
    } else {
      await category.save();
      res.redirect(`/category/${category._id}`);
    }
  }),
];

// Handle Category deletion on GET.
exports.category_delete_get = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).exec();
  if (category) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
    });
  } else {
    res.send("Category not found");
  }
});

// Category deletion POST
exports.category_delete_post = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.categoryid).exec();
  if (!category) {
    return res.send("Category not found");
  }

  // Check if there are any items associated with the category
  const itemsCount = await Item.countDocuments({
    category: req.body.categoryid,
  });
  if (itemsCount > 0) {
    return res.send(
      "Cannot delete category. Items are associated with this category."
    );
  }

  // No associated items, proceed with deletion
  await Category.findByIdAndDelete(req.body.categoryid);
  res.redirect("/category");
});

exports.category_update_get = function (req, res) {
  console.log("Defining category_list");
  res.send("NOT IMPLEMENTED: Category list");
};

exports.category_update_post = function (req, res) {
  console.log("Defining category_list");
  res.send("NOT IMPLEMENTED: Category list");
};

exports.category_detail = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).exec();
  if (category) {
    res.render("category_detail", {
      title: "Category Detail",
      category: category,
    });
  } else {
    res.send("Category not found");
  }
});
