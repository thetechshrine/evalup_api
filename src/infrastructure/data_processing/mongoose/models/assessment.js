const mongoose = require('mongoose');

const assessmentEnums = require('../../../../database/enums/assessment');

const assessmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(assessmentEnums.types),
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    groupId: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);
