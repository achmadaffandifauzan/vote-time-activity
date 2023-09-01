const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
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
    createdVote: [
      {
        type: Schema.Types.ObjectId,
        ref: "VotingAgenda",
      },
    ],
    hasVoteOn: [
      // not his exact vote, but the agenda that he voted on
      // because there is no model of individual vote
      {
        type: Schema.Types.ObjectId,
        ref: "VotingAgenda",
      },
    ],
  },
  { timestamps: true }
);
const options = {
  usernameField: "email",
  errorMessages: {
    UserExistsError:
      "A user with the given username or email is already registered",
  },
};
userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", userSchema);
