const mongoose = require('mongoose');

const assetEnums = require('../../../../database/enums/asset');

const assetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: Object.values(assetEnums.types),
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(assetEnums.roles),
    },
    targetResource: {
      type: String,
      required: true,
      enum: Object.values(assetEnums.targetResources),
    },
    url: {
      type: String,
      required: true,
    },
    remoteId: {
      type: String,
    },
    assessmentId: {
      type: String,
    },
    assessmentResultId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Asset || mongoose.model('Asset', assetSchema);
