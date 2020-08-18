import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        users(contains: String): [User!]!
    }
    type User {
        id: ID!
        name: String!
        email: String!
    }
`

// RAW DATA 
const users = [
    {
        id: '1234',
        name: 'John',
        email: 'email@email.com'
    },
    {
        id: '4567',
        name: 'Doe',
        email: 'email@email.com'
    },
]

const resolvers = {
    Query: {
        users: (parent, args, ctx, info) => {
            if (!args.contains) {
                return users
            }
            // checks if string query passed by client is contained in the name 
            return users.filter(user => {
                return user.name.toLowerCase().includes(args.contains.toLowerCase())
            });
        }
    }
}


// SERVER SETUP
const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => {
    console.log('Server started on port 4000');
});