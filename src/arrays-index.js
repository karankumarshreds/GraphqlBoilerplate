import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        comments: [String]!
        add(numbers: [Int]!): Int!
    }
`
const resolvers = {
    Query: {
        comments: (parent, args, ctx, info) => {
            return [
                "first",
                "second",
                "third"
            ]
        },
        add: (parent, args, ctx, info) => {
            const sum = args.numbers.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            });
            return sum;
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server started on port 4000')
}) 