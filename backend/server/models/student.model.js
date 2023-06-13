const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Please add fullname'],
    trim: true,
    min: 5,
  },

  schoolYear: {
    type: String,
    required: [true, 'Please add school year'],
  },

  class: {
    type: mongoose.Schema.Types.String,
    ref: 'Class',
    default: null,
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other', null],
    required: true,
  },

  dob: {
    type: Date,
    required: [true, 'Please add date of birth'],
    get: (date) => date.toLocaleDateString('sp-MX'),
  },

  email: {
    type: String,
    match: [/.+\@.+\..+/, 'Please add correct email type'],
    lowercase: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: 'string' } },
    },
    set: (v) => (v === '' ? null : v),
    default: null,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
