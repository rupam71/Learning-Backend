import mongoose, { Document, Schema } from "mongoose";

const ApplicationLogSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    stack: {
      type: Object,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const ApplicationLog = mongoose.model<any>(
  "ApplicationLog",
  ApplicationLogSchema,
);

export default ApplicationLog;
