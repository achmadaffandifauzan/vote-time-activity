const mongoose = require("mongoose");
const { Schema } = mongoose;

const votingAgendaSchema = new Schema({
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
  votingResults: {
    type: Schema.Types.ObjectId,
    ref: "VotingResult",
  },
});

module.export = mongoose.model("VotingAgenda", votingAgendaSchema);
