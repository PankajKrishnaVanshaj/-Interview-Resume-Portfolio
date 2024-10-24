import mongoose, { Schema } from "mongoose";

const mockInterviewSchema = new Schema(
  {
    jsonMockResp: {
      type: String,
      required: true,
    },
    jobPosition: {
      type: String,
      required: true,
    },
    jobDesc: {
      type: String,
      required: true,
    },
    jobExperience: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create a Model.
const MockInterviewModel =
  mongoose.models.MockInterview ||
  mongoose.model("MockInterview", mockInterviewSchema);

export default MockInterviewModel;
