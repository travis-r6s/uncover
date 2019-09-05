import { gql, ApolloServer } from 'apollo-server-azure-functions'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

export default server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
