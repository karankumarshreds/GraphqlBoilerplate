/**
 * THIS USES CUSTOM TYPES AND ARGUMENTS 
 */

import { GraphQLServer } from 'graphql-yoga';

// greeting takes in a name property from the client
const typeDefs = `
    type Query {
        greeting(name: String!, account: String!): String!
        me: User!,
    }
    type User {
        id      : ID!,
        name    : String!,
        email   : String!,
        age     : Int!
    }
`

const resolvers = {
    Query: {
        me: () => {
            return {
                id: "12345",
                name: "Karan Kumar",
                email: "email@gmail.com",
                age: 123
            }
        },
        // second parameter (args) recieves the object of data 
        // passed by the client while making a query as property
        // "name" as mentioned in the Query definitions 
        greeting: (parent, args, ctx, info) => {
            const { name, account } = args;
            return (
                `Hello ${name}, you're logged in as ${account}`
            )
        }


    }
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(() => {
    console.log('Graphql server started')
})


/**
 * @client
 * query {
 *   greeting(name: "Karan")
 * }
 */