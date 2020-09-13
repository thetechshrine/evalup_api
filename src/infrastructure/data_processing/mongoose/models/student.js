const mongoose = require('mongoose');

const studentEnums = require('../../../../database/enums/student');

const studentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(studentEnums.genders),
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
      enum: Object.keys(studentEnums.countries),
    },
    birthDate: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    accountId: {
      type: String,
      required: true,
    },
    addressId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Student || mongoose.model('Student', studentSchema);
