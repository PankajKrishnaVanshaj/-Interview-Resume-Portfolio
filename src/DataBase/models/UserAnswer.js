import mongoose, { Schema } from "mongoose";

const UserAnswerSchema = new Schema(
  {
    mockIdRef: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    correctAns: {
      type: String,
    },
    userAns: {
      type: String,
    },
    feedback: {
      type: String,
    },
    rating: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create a Model.
const UserAnswerModel =
  mongoose.models.UserAnswer || mongoose.model("UserAnswer", UserAnswerSchema);

export default UserAnswerModel;
