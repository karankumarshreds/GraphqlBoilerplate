import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

import { users, posts, comments } from './dummy-data';
console.clear();

const typeDefs = `
    type Query {
        users(contains: String): [User!]!
        posts: [Post!]!
        comments(postId): [Comment!]!
    }
    type Post {
        id: ID!
        title: String!
        author: User!
        comment: Comment
    }
    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post]!
        comments: [Comment]!
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
        post: ID!
    }

    type Mutation {
        createUser(name: String!, email: String!): User
        createPost(title: String!, author: ID!): Post
        createComment(text: String!, author: ID!, post: ID!): Comment
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
    },

    Mutation: {
        createUser: (parent, args) => {
            const { email, name } = args;
            const emailTaken = users.find(user => user.email === email && true);
            if (emailTaken) throw new Error('EMAIL ALREADY IN USE');
            let user = {
                id: uuidv4(),
                name,
                email
            }
            users.push(user);
            return user
        },
        createPost: (parent, args) => {
            const { id, title, author } = args;
            const userExists = users.find(user => user.id === author);
            if (!userExists) throw new Error('USER DOES NOT EXIST');
            const post = {
                id: uuidv4(),
                title,
                author
            }
            posts.push(post);
            return post;
        },
        createComment: (parent, args) => {
            const { text, author, post } = args;
            console.log(`POST ID RECIEVED ${post}`)
            console.log(`TYPE OF POST PASSED ${typeof (post)}`)
            const userExists = users.find(user => user.id === author);
            const postExists = posts.find(each => each.id === post);
            console.log('POST EXISTS?', postExists);
            if (!userExists) throw new Error('USER DOES NOT EXIST');
            if (!postExists) throw new Error('POST DOES NOT EXIST');
            const comment = {
                id: uuidv4(),
                post,
                author,
                text
            }
            comments.push(comment);
            return comment;
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