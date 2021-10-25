const express = require("express")
const {ApolloServer} = require("apollo-server-express")
const mongoose = require("mongoose")
const typeDefs = require("./schema")
const Mutation = require("./resolvers/mutation")
const Query = require("./resolvers/query")
const Category = require("./resolvers/category")
const Animal = require("./resolvers/animal")

// const typeDefs = gql``
const resolvers = {
  Query,
  Mutation,
  Category,
  Animal,
}

const startServer = async () => {
  const app = express()

  const apolloServer = new ApolloServer({typeDefs, resolvers})
  await apolloServer.start()
  apolloServer.applyMiddleware({app: app})

  app.use((req, res) => res.send("Welcome from express apollo server"))

  await mongoose.connect(
    "mongodb://localhost:27017/gql-crash",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    () => console.log("mongoose connected"),
  )

  const port = 4000
  app.listen(port, () => console.log(`Server listening on port ${port}!`))
}

startServer()
