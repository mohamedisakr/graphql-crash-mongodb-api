const mongoose = require("mongoose")
const {Schema, model} = mongoose

const schema = {
  image: {type: String, required: true},
  title: {type: String, required: true},
  rating: {type: Schema.Types.Decimal128},
  price: {type: String, required: true},
  description: {type: [String], required: true},
  slug: {type: String, required: true},
  stock: {type: String, required: true},
  onSale: {type: Boolean, default: false},
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
}

const animalSchema = new Schema(schema)
const Animal = model("animal", animalSchema)

module.exports = Animal
