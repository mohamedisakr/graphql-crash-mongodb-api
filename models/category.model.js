const mongoose = require("mongoose")
const {Schema, model} = mongoose

const schema = {
  image: {type: String, required: true},
  slug: {type: String, required: true},
  category: {type: String, required: true},
  animals: [
    {
      type: Schema.Types.ObjectId,
      ref: "animal",
    },
  ],
}

const categorySchema = new Schema(schema)
const Category = model("category", categorySchema)

module.exports = Category
