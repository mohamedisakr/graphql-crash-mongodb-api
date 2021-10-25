const Animal = require("../models/animal.model")
const Category = require("../models/category.model")

const Mutation = {
  addCategory: async (parent, args, context, info) => {
    const {image, slug, category, animals} = args
    const newCategory = new Category({image, slug, category, animals})
    const savedCategory = await newCategory.save()
    return savedCategory
  },

  addAnimal: async (parent, args, context, info) => {
    const {
      image,
      title,
      rating,
      price,
      description,
      slug,
      stock,
      onSale,
      category,
    } = args

    const newAnimal = new Animal({
      image,
      title,
      rating,
      price,
      description,
      slug,
      stock,
      onSale,
      category,
    })

    const theCategory = await Category.findById(newAnimal.category)
    const savedAnimal = await newAnimal.save()
    theCategory.animals = theCategory.animals.concat(savedAnimal._id)
    await theCategory.save()
    return savedAnimal
  },

  removeAnimal: (parent, args, {animals}) => {
    const {id} = args
    // animals = animals.filter((item) => item.id !== id)
    const index = animals.findIndex((item) => item.id === id)
    animals.splice(index, 1)
    return true
  },
}

module.exports = Mutation
