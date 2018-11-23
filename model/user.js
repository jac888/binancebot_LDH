const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect(
  "mongodb://localhost/customers",
  { useCreateIndex: true, useNewUrlParser: true }
);

const db = mongoose.connection;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

//bcrypt salt and password
const saltRounds = 10;
//const myPlaintextPassword = "s0//P4$$w0rD";
//const someOtherPlaintextPassword = "not_bacon";

module.exports.createUser = function(newUser, callback) {
  bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    newUser.password = hash;
    newUser.save(callback);
  });
};
