## API

- move connection from index.js to models (mongoose)

- for mongoose models -> apollo server resolvers return key-value models

  1. make index.js file in models folder
  2. import/require all models into index.js (in the same directory)
  3. in server.js/index.js destructure the models in apollo server context

- for resolvers -> each type has its own resolver
  1. make index.js file in resolvers folder
  2. import/require resolvers into index.js (in the same directory) and export
     them
     ```
       const animal = require("./animal")
       const category = require("./category")
       module.exports = [animal, category]
     ```
  3. in server.js/index.js import resolvers directory
     ```
       const resolvers = require("./resolvers")
     ```
