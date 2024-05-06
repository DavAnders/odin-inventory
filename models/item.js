const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
  URL: { type: String },
});

module.exports = mongoose.model("Item", ItemSchema);
