## API

- move connection from index.js to models (mongoose)
- apollo server resolvers return key-value models
  1. make index.js file in models folder
  2. import/require all models into index.js
  3. in server.js/index.js destructure the models in apollo server context
