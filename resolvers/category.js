module.exports = {
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
}

// module.exports = categoryResolver
