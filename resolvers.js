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
