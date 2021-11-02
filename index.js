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
    animal: async (parent, {id}, context) => {
      return Animal.findById(id).exec()
    },

    // movies: async () => {
    //   try {
    //     const allMovies = await Movie.find()
    //     return allMovies
    //   } catch (e) {
    //     console.log("e", e)
    //     return []
    //   }
    // },

    // movie: async (obj, {id}) => {
    //   try {
    //     const foundMovie = await Movie.findById(id)
    //     return foundMovie
    //   } catch (e) {
    //     console.log("e", e)
    //     return {}
    //   }
    // },
  },

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

  // Mutation: {
  //   addMovie: async (obj, {movie}, {userId}) => {
  //     try {
  //       if (userId) {
  //         // Do mutation and of database stuff
  //         const newMovie = await Movie.create({
  //           ...movie,
  //         })
  //         pubsub.publish(MOVIE_ADDED, {movieAdded: newMovie})
  //         const allMovies = await Movie.find()
  //         return allMovies
  //       }
  //       return movies
  //     } catch (e) {
  //       console.log("e", e)
  //       return []
  //     }
  //   },
  // },
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
