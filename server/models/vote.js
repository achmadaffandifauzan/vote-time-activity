const mongoose = require("mongoose");
const { Schema } = mongoose;

const voteSchema = new Schema({
  votingResult: {
    type: Schema.Types.ObjectId,
    ref: "VotingResult",
  },
  votingAgenda: {
    type: Schema.Types.ObjectId,
    ref: "VotingAgenda",
  },
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  created: {
    type: String,
  },
  votedDate: {
    type: String,
  },
});
module.exports = mongoose.model("Vote", voteSchema);
