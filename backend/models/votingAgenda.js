const mongoose = require("mongoose");
const { Schema } = mongoose;

const votingAgendaSchema = new Schema({
  // years and months are help to display vote result in calendar format
  years: [
    {
      type: String,
      required: true,
    },
  ],
  months: [
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
  votingResults: {
    type: Schema.Types.ObjectId,
    ref: "VotingResult",
  },
  allowMultipleDateVotes: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("VotingAgenda", votingAgendaSchema);
