const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});
const options = {
  usernameField: "email",
  errorMessages: {
    UserExistsError:
      "A user with the given username or email is already registered",
  },
};
userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", userSchema);
