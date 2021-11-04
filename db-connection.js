const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/gql-crash"

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

const callback = () => console.log("mongoose connected")

const connect = () => {
  return mongoose.connect(url, {...options}, callback)
}

module.exports = connect
