const mongoose = require("mongoose");
const { Schema } = mongoose;

// this is result per month
const votingResultSchema = new Schema({
  votingAgenda: {
    type: Schema.Types.ObjectId,
    ref: "VotingAgenda",
  },
  monthWithYear: {
    type: String,
    required: true,
  },
  // [0,0,0,0,0...]
  results: [Number],
  details: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vote",
    },
  ],
});

module.exports = mongoose.model("VotingResult", votingResultSchema);
