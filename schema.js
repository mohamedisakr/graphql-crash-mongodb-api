const {gql} = require('apollo-server-express')

const typeDefs = gql`
  type MainCard {
    title: String
    image: String
  }

  type Animal {
    id: ID!
    image: String!
    title: String!
    rating: Float
    price: String!
    description: [String!]
    slug: String!
    stock: String!
    onSale: Boolean
    category: Category
  }

  type Category {
    id: ID!
    image: String!
    category: String!
    slug: String!
    animals: [Animal!]!
  }

  type Query {
    mainCards: [MainCard]
    animals: [Animal]
    animal(slug: String!): Animal
    byId(id: ID!): Animal
    categories: [Category!]!
    category(slug: String!): Category
  }

  type Mutation {
    addAnimal(
      image: String!
      title: String!
      rating: Float
      price: String!
      description: [String!]!
      slug: String!
      stock: String!
      onSale: Boolean
      category: String!
    ): Animal
    removeAnimal(id: ID!): Boolean!
  }
`
module.exports = typeDefs
