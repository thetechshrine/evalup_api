const mongoose = require('mongoose');

const accountEnums = require('../../../../database/enums/account');

const accountSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(accountEnums.roles),
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Account || mongoose.model('Account', accountSchema);
