import connectToDatabase from "@/DataBase/connectdb";
import UserAnswerModel from "@/DataBase/models/UserAnswer";
import { NextResponse } from "next/server";

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
        const interview = await UserAnswerModel.findById(id);
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

      const mockInterviews = await UserAnswerModel.find({
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

    const {
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      createdBy,
    } = req.body;

    if (!createdBy || !question || !correctAns || !userAns) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: correctAns, question, createdBy",
        },
        { status: 400 }
      );
    }

    const newUserAnswer = new UserAnswerModel({
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      createdBy,
    });

    const savedUserAnswer = await newUserAnswer.save();

    return NextResponse.json(
      {
        success: true,
        data: savedUserAnswer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving user answer:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server Error",
      },
      { status: 500 }
    );
  }
}
