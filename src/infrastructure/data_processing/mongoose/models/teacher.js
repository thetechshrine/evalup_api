const mongoose = require('mongoose');

const teacherEnums = require('../../../../database/enums/teacher');

const teacherSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: Object.values(teacherEnums.types),
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

module.exports =
  mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);
