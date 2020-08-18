#### BABEL 

> npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env nodemon

> touch .babelrc

Add the following config to it: 

```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

Add following to package.json (only for development): 

```json
"scripts": {
    "start": "nodemon src/index.js --exec babel-node"
  }
```

#### GRAPHQL

> npm install graphql-yoga@1.16.7
