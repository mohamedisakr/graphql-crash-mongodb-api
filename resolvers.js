const resolvers = {
  Query: {
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
    animals: async (parent, args, {Animal}) => {
      try {
        const allAnimals = await Animal.find({}).exec()
        return allAnimals
      } catch (e) {
        console.log("e", e)
        return []
      }
    },
    animalById: async (parent, {id}, {Animal}) => {
      console.log(`animal id : ${id}`)
      const foundAnimal = await Animal.findById(id).exec()
      console.log(`animal found : ${foundAnimal}`)
      return foundAnimal
    },
  },
  Mutation: {
    addCategory: async (parent, args, {Category}) => {
      const newCategory = await Category.create({...args})
      console.log(args)
      return newCategory
    },
  },
  Category: {
    id: ({_id, id}) => _id || id,
    animals: async (parent, args, {Animal}) => {
      console.log(parent)
      const animalsInCategory = await Animal.find({category: parent.id})
      return animalsInCategory
    },
  },
  Animal: {
    id: ({_id, id}) => _id || id,
    category: async (parent, args, {Category}) => {
      // console.log(parent)
      const categoryForAnimal = await Category.findOne({id: parent.id})
      return categoryForAnimal
    },
  },
}

module.exports = resolvers

// { Category: Model { category }, Animal: Model { animal } }

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
