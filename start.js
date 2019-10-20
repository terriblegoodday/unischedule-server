import { ApolloServer } from 'apollo-server'
import { typeDefs } from './typedefs'
import { resolvers } from './resolvers'
import { Teacher, Group, Class } from './database'

const server = new ApolloServer(
  {
    typeDefs,
    resolvers
  }
)

export function start() {
    server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}