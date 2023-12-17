// models/Pack.js
const mongoose = require("mongoose");

const packSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Assuming your product model is named "Product"
    },
  ],
});

const Pack = mongoose.model("Pack", packSchema);

module.exports = Pack;
