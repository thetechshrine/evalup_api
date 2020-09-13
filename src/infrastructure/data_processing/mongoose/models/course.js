const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    credits: {
      type: Number,
      required: true,
    },
    successNote: {
      type: Number,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Course || mongoose.model('Course', courseSchema);
