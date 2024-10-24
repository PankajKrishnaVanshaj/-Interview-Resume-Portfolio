import mongoose from "mongoose";

const { Schema } = mongoose;

const portfolioSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    cats: {
      type: String,
    },
    tech: {
      type: [String],
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PortfolioModel =
  mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

export default PortfolioModel;
