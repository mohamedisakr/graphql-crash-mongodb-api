const Category = require("./models/category.model")
const Animal = require("./models/animal.model")

const resolvers = {
  Query: {
    animals: async (parent, args, context) => {
      try {
        const allAnimals = await Animal.find({}).exec()
        return allAnimals
      } catch (e) {
        console.log("e", e)
        return []
      }
    },
    animalById: async (parent, {id}, context) => {
      console.log(`animal id : ${id}`)
      const foundAnimal = await Animal.findById(id).exec()
      console.log(`animal found : ${foundAnimal}`)
      return foundAnimal
    },
    categories: async (parent, args, context) => {
      try {
        const allCategories = await Category.find({}).exec()
        return allCategories
      } catch (e) {
        console.log("e", e)
        return []
      }
    },
  },
  Mutation: {
    addCategory: async (parent, args, context) => {
      const newCategory = await Category.create({...args})
      console.log(args)
      return newCategory
    },
  },
  Category: {
    id: ({_id, id}) => _id || id,
    animals: async (parent, args, context) => {
      console.log(parent)
      const animalsInCategory = await Animal.find({category: parent.id})
      return animalsInCategory
    },
  },
  Animal: {
    id: ({_id, id}) => _id || id,
    category: async (parent, args, context) => {
      // console.log(parent)
      const categoryForAnimal = await Category.findOne({id: parent.id})
      return categoryForAnimal
    },
  },
}

module.exports = resolvers

/*
module.exports = {
  Query: {
    animals(parent, args, {Animal}) {
      return Animal.find({}).exec()
    },
    animal(parent, {id}, {Animal}) {
      return Animal.findById(id).exec()
    },
  },
  Mutation: {},
  category: (parent, args, {Category}) => {
    console.log(parent)
    return Category.find((cate) => cate.id === parent.category)
  },
}

// module.exports = Animal
*/
