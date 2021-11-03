const express = require("express")
const {ApolloServer} = require("apollo-server-express")
const mongoose = require("mongoose")
const typeDefs = require("./schema")
const Mutation = require("./resolvers/mutation")
const Query = require("./resolvers/query")
const Category = require("./models/category.model")
const Animal = require("./models/animal.model")

// const Category = require("./resolvers/category")
// const Animal = require("./resolvers/animal")

// const resolvers = {
//   Query,
//   Mutation,
//   Category,
//   Animal,
// }

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

const startServer = async () => {
  const app = express()

  const db = await mongoose.connect(
    "mongodb://localhost:27017/gql-crash",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    () => console.log("mongoose connected"),
  )

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // context() {
    //   return {Category, Animal, db}
    // },
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({app: app})

  app.use((req, res) => res.send("Welcome from express apollo server"))

  const port = 4000
  app.listen(port, () => console.log(`Server listening on port ${port}!`))
}

startServer()

// old code with separate query, resolvers, and schema
/*
// const typeDefs = gql``
const resolvers = {
  Query,
  Mutation,
  Category,
  Animal,
}

const startServer = async () => {
  const app = express()

  const db = await mongoose.connect(
    "mongodb://localhost:27017/gql-crash",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    () => console.log("mongoose connected"),
  )

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
      return {Category, Animal, db}
    },
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({app: app})

  app.use((req, res) => res.send("Welcome from express apollo server"))

  const port = 4000
  app.listen(port, () => console.log(`Server listening on port ${port}!`))
}

startServer()
*/

// addMovie: async (obj, {movie}, {userId}) => {
//   try {
//     if (userId) {
//       // Do mutation and of database stuff
//       const newMovie = await Movie.create({
//         ...movie,
//       })
//       pubsub.publish(MOVIE_ADDED, {movieAdded: newMovie})
//       const allMovies = await Movie.find()
//       return allMovies
//     }
//     return movies
//   } catch (e) {
//     console.log("e", e)
//     return []
//   }
// },

// Movie: {
//   actor: (obj, arg, context) => {
//     // DB Call
//     const actorIds = obj.actor.map((actor) => actor.id)
//     const filteredActors = actors.filter((actor) => {
//       return actorIds.includes(actor.id)
//     })
//     return filteredActors
//   },
// },
