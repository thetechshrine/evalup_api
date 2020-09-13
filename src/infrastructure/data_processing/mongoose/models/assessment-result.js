const mongoose = require('mongoose');

const assessmentResultEnums = require('../../../../database/enums/assessment-result');

const assessmentResultSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    obtainedNote: {
      type: Number,
      required: true,
    },
    obtainedCredits: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(assessmentResultEnums.statuses),
    },
    studentId: {
      type: String,
      required: true,
    },
    assessmentId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.AssessmentResult ||
  mongoose.model('AssessmentResult', assessmentResultSchema);
