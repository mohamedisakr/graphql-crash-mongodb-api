const {ApolloServer} = require("apollo-server-express")
const express = require("express")
const connect = require("./db-connection")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const models = require("./models")

const startServer = async () => {
  const app = express()

  const db = await connect()

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      ...models,
    },
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({app: app})

  app.use((req, res) => res.send("Welcome from express apollo server"))

  const port = 4000
  app.listen(port, () => console.log(`Server listening on port ${port}!`))
}

startServer()

// const db = await mongoose.connect(
//   "mongodb://localhost:27017/gql-crash",
//   {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   },
//   () => console.log("mongoose connected"),
// )
