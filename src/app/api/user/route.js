// api/user.js

import connectToDatabase from "@/DataBase/connectdb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/DataBase/models/user";

export async function PUT(req) {
  try {
    // Ensure proper session handling if required
    const session = await getServerSession({ req, authOptions });
    const createdBy = session?.user?.email;

    await connectToDatabase(); // Ensure MongoDB connection

    const body = await req.json(); // Parse request body
    const {
      username,
      bio,
      twitter,
      facebook,
      instagram,
      linkedin,
      github,
      resume,
      avatar,
      number,
      skills,
    } = body;

    // Validate required fields
    if (!createdBy || !username) {
      return NextResponse.json(
        { success: false, error: "Missing parameter" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await UserModel.findOne({ email: createdBy });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Update user document with new data
    user.username = username;
    user.bio = bio;
    user.twitter = twitter;
    user.facebook = facebook;
    user.instagram = instagram;
    user.linkedin = linkedin;
    user.github = github;
    user.resume = resume;
    user.avatar = avatar;
    user.number = number;
    user.skills = skills; // Assign skills array

    // Save updated user document
    const updatedUser = await user.save();

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
