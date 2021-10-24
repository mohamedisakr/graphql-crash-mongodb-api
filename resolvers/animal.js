const Animal = {
  category: (parent, args, {categories}) => {
    console.log(parent)
    return categories.find((cate) => cate.id === parent.category)
  },
}

module.exports = Animal
