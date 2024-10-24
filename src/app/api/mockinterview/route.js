import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectToDatabase from "@/DataBase/connectdb";
import UserModel from "@/DataBase/models/user";
import MockInterviewModel from "@/DataBase/models/MockInterview";

async function connectDB() {
  try {
    await connectToDatabase();
  } catch (error) {
    throw new Error("Database connection error");
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession({ req, authOptions });
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      try {
        const interview = await MockInterviewModel.findById(id);
        if (!interview) {
          return NextResponse.json(
            { success: false, error: "Interview not found" },
            { status: 404 }
          );
        }
        return NextResponse.json(
          { success: true, data: interview },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error fetching interview details:", error);
        return NextResponse.json(
          { success: false, error: "Server Error" },
          { status: 500 }
        );
      }
    } else {
      const createdBy = session?.user?.email;
      if (!createdBy) {
        return NextResponse.json(
          { success: false, error: "Missing createdBy parameter" },
          { status: 400 }
        );
      }

      const user = await UserModel.findOne({ email: createdBy });

      if (!user) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
      }

      const mockInterviews = await MockInterviewModel.find({
        createdBy: user._id,
      });

      return NextResponse.json(
        { success: true, data: mockInterviews },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession({ req, authOptions });
    const body = await req.json();

    const { jsonMockResp, jobPosition, jobDesc, jobExperience } = body;
    const createdBy = session?.user?.email;

    if (!jsonMockResp || !jobPosition || !jobDesc || !jobExperience) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!createdBy) {
      return NextResponse.json(
        { success: false, error: "Missing createdBy parameter" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email: createdBy });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const mockInterviewData = {
      jsonMockResp,
      jobPosition,
      jobDesc,
      jobExperience,
      createdBy: user._id,
    };

    const newMockInterview = new MockInterviewModel(mockInterviewData);
    const savedMockInterview = await newMockInterview.save();

    return NextResponse.json(
      { success: true, data: savedMockInterview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// delete interview

export async function DELETE(req) {
  try {
    const session = await getServerSession({ req, authOptions });
    const { id } = await req.json();
    console.log("interview ID:", id);

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing interview ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const createdBy = session?.user?.email;
    if (!createdBy) {
      return NextResponse.json(
        { success: false, error: "Missing createdBy parameter" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email: createdBy });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const interview = await MockInterviewModel.findOneAndDelete({
      _id: id,
      createdBy: user._id,
    });

    if (!interview) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "interview deleted successfully" },
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
