const mongoose = require("mongoose");
const { Schema } = mongoose;

const votingAgendaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // years and months are help to display vote result in calendar format
  monthsWithYear: [
    {
      type: String,
      required: true,
    },
  ],
  dates: [
    {
      type: String,
      required: true,
    },
  ],
  votersName: [
    {
      // to make sure same name cannot vote more than once on one VotingAgenda,
      // why not unique : true ? becasuse unique will check to different VotingAgenda as well, not this VotingAgenda only
      type: String,
    },
  ],
  totalVote: {
    // each person may vote multiple date, that's why totalVote is needed for stats use
    type: Number,
  },
  votingResults: [
    {
      type: Schema.Types.ObjectId,
      ref: "VotingResult",
    },
  ],
  allowMultipleDateVotes: {
    type: Boolean,
    required: true,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("VotingAgenda", votingAgendaSchema);
