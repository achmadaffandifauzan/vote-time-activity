const mongoose = require("mongoose");
const { Schema } = mongoose;

const votingAgendaSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  votingResults: {
    type: Schema.Types.ObjectId,
    ref: "VotingResult",
  },
});

module.export = mongoose.model("VotingAgenda", votingAgendaSchema);
