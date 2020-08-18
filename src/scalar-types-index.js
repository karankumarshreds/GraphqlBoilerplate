import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
/** hello is a query */
const typeDefs = `
    type Query {
        name        : String!,
        id          : ID!
        age         : Int!
        employed    : Boolean!
        gpa         : Float
    }
`

// Resolvers (functions)
const resolvers = {
    Query: {
        name: () => "Karan",
        id: () => "12345",
        age: () => "23",
        employed: () => true,
        gpa: () => null
    }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => {
    console.log('Server is running on port 4000')
})