import mongoose, { Schema } from "mongoose";

// Define the nested schemas for education, experience, and skills
const EducationSchema = new Schema({
  // id: { type: Number },
  universityName: { type: String },
  degree: { type: String },
  major: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
});

const ExperienceSchema = new Schema({
  // id: { type: Number },
  title: { type: String },
  companyName: { type: String },
  city: { type: String },
  state: { type: String },
  // country: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  currentlyWorking: { type: Boolean },
  workSummery: { type: String },
});

const SkillSchema = new Schema({
  // id: { type: Number },
  name: { type: String },
  rating: { type: Number },
});

// Define the main Resume schema
const ResumeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    personal_info: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      jobTitle: { type: String },
      themeColor: { type: String },
      summery: { type: String },
    },
    education: [EducationSchema],
    experience: [ExperienceSchema],
    skills: [SkillSchema],
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the model
const ResumeModel =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

export default ResumeModel;
