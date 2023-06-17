const {MongoClient} = require("mongodb")

let dbConnection

module.exports = {
  connectToDB: (cb) => {
    MongoClient.connect("mongodb+srv://not14play:dbpassword@electivemgtcluster0.m0z8vxr.mongodb.net/?retryWrites=true&w=majority")
    .then((client) => {
      dbConnection = client.db("ElectiveMGT_db")
      return cb()
    })
    .catch(err => {
      console.log(err)
      return cb(err)
    })
  },
  getDb: () => dbConnection
}