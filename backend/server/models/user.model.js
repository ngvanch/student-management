const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      min: 5,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Please add a password'],
      min: 5,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    fullname: {
      type: String,
      min: 3,
      trim: true,
      default: null,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other', null],
      default: null,
    },

    dob: {
      type: Date,
      default: null,
    },

    address: {
      type: String,
      min: 5,
      default: null,
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
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
