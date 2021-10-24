const Category = {
  animals: (parent, args, {animals}) => {
    console.log(parent)
    return animals.filter((ani) => ani.category === parent.id)
  },
}

module.exports = Category
