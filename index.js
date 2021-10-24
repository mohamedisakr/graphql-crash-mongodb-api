const express = require('express')
const {ApolloServer, gql} = require('apollo-server-express')
const typeDefs = require('./schema')
const Mutation = require('./resolvers/mutation')
const Query = require('./resolvers/query')
const Category = require('./resolvers/category')
const Animal = require('./resolvers/animal')

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

  app.use((req, res) => res.send('Welcome from express apollo server'))

  const port = 4000
  app.listen(port, () => console.log(`Server listening on port ${port}!`))
}

startServer()
