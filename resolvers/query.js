const Animal = require("../models/animal.model")

const Query = {
  animals: async (parent, args, context) => {
    const animals = await Animal.find({}).exec()
    return animals
  },
  categories: async (parent, args, {Category}) => {
    console.log(Category)
    try {
      const allCategories = await Category.find({}).exec()
      return allCategories
    } catch (e) {
      console.error(e)
      return []
    }
  },
  mainCards: (parent, args, {mainCards}) => mainCards,

  category: (parent, {slug}, {categories}) => {
    console.log(slug)
    let categoryToFind = categories.find(
      (anim) => anim.slug.toLowerCase() === slug.toLowerCase(),
    )
    return categoryToFind
  },

  animal: (parent, {slug}, {animals}) => {
    console.log(slug)
    let animalToFind = animals.find(
      (anim) => anim.slug.toLowerCase() === slug.toLowerCase(),
    )
    return animalToFind
  },
  byId: (parent, {id}, {animals}) => {
    console.log(id)
    let animalToFind = animals.find((anim) => anim.id === id)
    return animalToFind
  },
}

module.exports = Query
