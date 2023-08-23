const mongoose = require("mongoose");
const { Schema } = mongoose;

const votingResultSchema = new Schema({
  votingAgenda: {
    type: Schema.Types.ObjectId,
    ref: "VotingAgenda",
  },
  // username is optional (if voter is registered)
  1: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  2: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  3: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  4: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  5: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  6: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  7: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  8: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  9: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  10: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  11: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  12: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  13: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  14: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  15: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  16: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  17: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  18: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  19: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  20: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  21: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  22: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  23: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  24: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  25: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  26: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  27: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  28: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  29: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  30: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
  31: [
    {
      name: {
        type: String,
        unique: true,
      },
      username: {
        type: String,
        unque: true,
      },
      created: {
        type: String,
      },
    },
  ],
});

module.export = mongoose.model("VotingResult", votingResultSchema);
