// Import necessary modules and models
import connectToDatabase from "@/DataBase/connectdb";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ResumeModel from "@/DataBase/models/Resume";
import { getServerSession } from "next-auth";
import UserModel from "@/DataBase/models/user";

// Function to establish database connection
async function connectDB() {
  try {
    await connectToDatabase();
  } catch (error) {
    throw new Error("Database connection error");
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession({ req, authOptions });
    const createdBy = session?.user?.email;

    const { id } = params; // Extracting the ID from path parameters

    const body = await req.json();
    const {
      firstName,
      lastName,
      jobTitle,
      address,
      phone,
      email,
      education,
      experience,
      skills,
      themeColor,
      summery,
    } = body;

    // Check if required fields are missing
    if (!id || !createdBy) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
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

    // Find resume by ID
    const resume = await ResumeModel.findById(id);
    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume not found" },
        { status: 404 }
      );
    }

    // Ensure the user has access to update this resume
    if (resume.createdBy.toString() !== user._id.toString()) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Update the resume document
    const updatedResume = await ResumeModel.findByIdAndUpdate(
      id,
      {
        "personal_info.firstName": firstName,
        "personal_info.lastName": lastName,
        "personal_info.email": email,
        "personal_info.phone": phone,
        "personal_info.address": address,
        "personal_info.jobTitle": jobTitle,
        "personal_info.themeColor": themeColor,
        "personal_info.summery": summery,
        education,
        experience,
        skills,
      },
      { new: true, runValidators: true }
    );

    // Return the updated resume data
    return NextResponse.json(
      { success: true, data: updatedResume },
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
