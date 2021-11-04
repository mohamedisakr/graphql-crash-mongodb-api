module.exports = getOne = (model) => async (id) => {
  try {
    const doc = await model.findOne({_id: id}).lean().exec()

    if (!doc) {
      return null
    }
    return doc
  } catch (e) {
    console.error(e)
  }
}

module.exports = getMany = async (model) => {
  try {
    const docs = await model.find({}).lean().exec()
    if (!docs) {
      return []
    }
    return docs
  } catch (e) {
    console.error(e)
  }
}

module.exports = createOne = (model) => async (newObject) => {
  try {
    const doc = await model.create({...newObject})
    return doc
  } catch (e) {
    console.error(e)
  }
}

module.exports = updateOne = (model) => async (id, updateObject) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate({_id: id}, updateObject, {new: true})
      .lean()
      .exec()

    if (!updatedDoc) {
      return
    }

    return updatedDoc
  } catch (e) {
    console.error(e)
  }
}

module.exports = removeOne = (model) => async (id) => {
  try {
    const removed = await model.findOneAndRemove({_id: id})

    if (!removed) {
      return
    }

    return removed
  } catch (e) {
    console.error(e)
  }
}

module.exports = crudOperation = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})
