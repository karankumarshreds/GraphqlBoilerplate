import { GraphQLServer } from 'graphql-yoga';
import { users, posts } from './dummy-data';

/**
 * ONE WAY RELATION
 */

const typeDefs = `
    type Query {
        users(contains: String): [User!]!
        posts: [Post!]!
    }
    type Post {
        id: ID!
        title: String!
        author: User!
    }
    type User {
        id: ID!
        name: String!
        email: String!
    }
`

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
        },
        posts: () => {
            return posts
        }
    },
    // 18 : We are doing this to fetch author property inside the post type
    // this is for setting the relations. Post information will be inside
    // the parent arg. This will be used if any user requests author info
    // This will be caled for each post object individually 
    Post: {
        author: (parent, arg, ctx, info) => {
            return users.find(user => user.id === parent.author)
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