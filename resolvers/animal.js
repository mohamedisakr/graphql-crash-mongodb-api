module.exports = {
  Query: {
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
  // Mutation: {},
  Animal: {
    id: ({_id, id}) => _id || id,
    category: async (parent, args, {Category}) => {
      // console.log(parent)
      const categoryForAnimal = await Category.findOne({id: parent.id})
      return categoryForAnimal
    },
  },
}

// module.exports = animalResolver
