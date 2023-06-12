const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student',
  },

  schoolYear: {
    type: Number,
    required: true,
  },

  semester: {
    type: Number,
    required: true,
  },

  subjectScore: [
    {
      subject: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'Subject',
      },
      _15mins: [
        {
          test: {
            type: Number,
            required: true,
          },
        },
      ],
      _45mins: [
        {
          test: {
            type: Number,
            required: true,
          },
        },
      ],
      _semester: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
