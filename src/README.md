### TYPES 

#### Scalar types: 
- String 
- Boolean
- Int, Float 
- ID // used to represent unique identifiers (type string)





### TABLE 
| Key                         | Type                                                            | Default | Note                                                                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typeDefs`                  | `String` or `Function` or `DocumentNode` or `array` of previous | `null`  | Contains GraphQL type definitions in [SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51) or file path to type definitions (required if `schema` is not provided \*)                                                |
| `resolvers`                 | Object                                                          | `null`  | Contains resolvers for the fields specified in `typeDefs` (required if `schema` is not provided \*)                                                                                                                                               |
| `resolverValidationOptions` | Object                                                          | `null`  | Object which controls the resolver validation behaviour (see ["Generating a schema"](https://www.apollographql.com/docs/graphql-tools/generate-schema.html#makeExecutableSchema)) for more information                                            |
| `schema`                    | Object                                                          | `null`  | An instance of [`GraphQLSchema`](http://graphql.org/graphql-js/type/#graphqlschema) (required if `typeDefs` and `resolvers` are not provided \*)                                                                                                  |
| `mocks`                     | Object or Boolean                                               | `null`  | Applies [mocks to schema](https://github.com/apollographql/graphql-tools/blob/master/docs/source/mocking.md). Setting this to true will apply a default mock, however you can pass an object to customize the mocks similar to the resolvers map. |
| `context`                   | Object or Function                                              | `{}`    | Contains custom data being passed through your resolver chain. This can be passed in as an object, or as a Function with the signature `(req: ContextParameters) => any` \*\*                                                                     |
| `schemaDirectives`          | Object                                                          | `null`  | [`Apollo Server schema directives`](https://www.apollographql.com/docs/graphql-tools/schema-directives.html) that allow for transforming schema types, fields, and arguments                                                                      |
| `middlewares`               | `array` of Middleware                                           | `[]`    | A list of [`GraphQLMiddleware`](https://github.com/graphcool/graphql-middleware) middleware.                                                                                                                                                      |