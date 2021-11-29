const mongoose = require("mongoose")
const {MongoDB_URI} = require("./config/connection-string")
const options = require("./config/connection-options")

const callback = () => console.log("mongoose connected")

mongoose.connect(MongoDB_URI, {...options}, callback)

// configure the toJSON schema option globally
mongoose.set("toJSON", {virtuals: true})

// produce a "plain" or "raw" representation of the object data without
// all the other "mongoose magic" parts of the extended object
mongoose.set("toObject", {virtuals: true})

// module.exports = connect

// const url = "mongodb://localhost:27017/gql-crash"

// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }
