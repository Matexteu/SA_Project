const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@socialmediadatabase.0yfvp6g.mongodb.net/users?retryWrites=true&w=majority")


const db = mongoose.connection;



module.exports = db;

