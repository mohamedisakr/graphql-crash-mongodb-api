// const {v4} = require('uuid')
const Mutation = {
  addAnimal: (parent, args, {animals}) => {
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

    const newAnimal = {
      // id: v4(),
      image,
      title,
      rating,
      price,
      description,
      slug,
      stock,
      onSale,
      category,
    }

    animals.push(newAnimal)
    return newAnimal
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
