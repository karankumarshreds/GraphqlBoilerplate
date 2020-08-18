#### BABEL 

> npm install babel-cli@6.26.0 babel-preset-env@1.7.0

> touch .babelrc

Add the following config to it: 

```json
{
    "presets": [
        "env"
    ]
}
```

Add following to package.json (only for development): 

```json
"scripts": {
    "start": "babel-node src/index.js"
  }
```

