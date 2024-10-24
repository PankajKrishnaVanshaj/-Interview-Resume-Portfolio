import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    secondemail: { type: String },
    bio: { type: String },
    number: { type: Number },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    avatar: { type: String },
    github: { type: String },
    resume: { type: String },
    skill: [{ img: String, name: String }],
  },
  { timestamps: true }
);

const UserModel = models.User || mongoose.model("User", userSchema);

export default UserModel;
