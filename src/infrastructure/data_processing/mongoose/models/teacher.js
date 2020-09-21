const mongoose = require('mongoose');

const commonEnums = require('../../../../database/enums/common');
const teacherEnums = require('../../../../database/enums/teacher');

const teacherSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(teacherEnums.types),
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(commonEnums.genders),
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    accountId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);
