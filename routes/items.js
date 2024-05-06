const express = require("express");
const router = express.Router();

// Controller methods
const item_controller = require("../controllers/itemController");

// GET request for list of all items.
router.get("/", item_controller.item_list);

// GET request for creating an item (Form display).
router.get("/create", item_controller.item_create_get);

// POST request for creating an item.
router.post("/create", item_controller.item_create_post);

// GET request to delete an item.
router.get("/:id/delete", item_controller.item_delete_get);

// POST request to delete an item.
router.post("/:id/delete", item_controller.item_delete_post);

// GET request to update an item.
router.get("/:id/update", item_controller.item_update_get);

// POST request to update an item.
router.post("/:id/update", item_controller.item_update_post);

// GET request for one item.
router.get("/:id", item_controller.item_detail);

module.exports = router;
