import { ApolloServer } from 'apollo-server-azure-functions'
import { makeSchema } from 'nexus'
import path from 'path'

import * as types from './schema'
const schema = makeSchema({
  types,
  outputs: {
    schema: path.resolve('src/graphql/generated/schema.graphql'),
    typegen: path.resolve('src/graphql/generated/typings.ts')
  }
})

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: process.env.NODE_ENV !== 'production'
})

export default server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
