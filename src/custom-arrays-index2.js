import { GraphQLServer } from 'graphql-yoga';

import { users, posts, comments } from './dummy-data';

const typeDefs = `
    type Query {
        users(contains: String): [User!]!
        posts: [Post!]!
        comments: [Comment!]!
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
        posts: [Post]
        comments: [Comment]!
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
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
        },
        comments: () => {
            return comments
        }
    },
    // Called if author property of the post is queried
    // Called individually for each post 
    Post: {
        author: (parent, arg, ctx, info) => {
            return users.find(user => user.id === parent.author)
        }
    },
    User: {
        posts: (parent, arg, ctx, info) => {
            return posts.filter(post => parent.id === post.author)
        }
    },
    Comment: {
        author: (parent) => {
            return users.find(user => user.id === parent.author)
        }
    },
    User: {
        comments: (parent) => {
            return comments.filter(comment => comment.author === parent.id)
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

/**
 * @client
 * query {
 *		users{
 *     name
 *     posts {
 *       title
 *     }
 *   }
 * }
 */

/**
 * query {
       users {
     name
     comments {
       text
     }
   }
}

 */