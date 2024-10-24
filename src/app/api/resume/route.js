// Import necessary modules and models
import connectToDatabase from "@/DataBase/connectdb";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
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

// GET endpoint to fetch resumes
export async function GET(req) {
  try {
    const session = await getServerSession({ req, authOptions });
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const resume = await ResumeModel.findById(id);
      if (!resume) {
        return NextResponse.json(
          { success: false, error: "Resume not found" },
          { status: 404 }
        );
      }

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

      if (resume.createdBy.toString() !== user._id.toString()) {
        return NextResponse.json(
          { success: false, error: "Unauthorized access" },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { success: true, data: resume },
        { status: 200 }
      );
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

      const Resumes = await ResumeModel.find({ createdBy: user._id });

      return NextResponse.json(
        { success: true, data: Resumes },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new resume
export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession({ req, authOptions });
    const body = await req.json();
    const { title } = body;
    const createdBy = session?.user?.email;

    if (!title || !createdBy) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
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

    const newResume = new ResumeModel({ title, createdBy: user._id });
    const savedResume = await newResume.save();

    return NextResponse.json(
      { success: true, data: savedResume },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to delete a resume
export async function DELETE(req) {
  try {
    const session = await getServerSession({ req, authOptions });
    const createdBy = session?.user?.email;

    await connectDB();
    const body = await req.json();
    const { id } = body;

    if (!id || !createdBy) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
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

    const resume = await ResumeModel.findById(id);
    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume not found" },
        { status: 404 }
      );
    }

    if (resume.createdBy.toString() !== user._id.toString()) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 }
      );
    }

    await resume.deleteOne();

    return NextResponse.json(
      { success: true, message: "Resume deleted successfully" },
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

// UPDATE endpoint to update a resume
// export async function PUT(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession({ req, authOptions });
//     const createdBy = session?.user?.email;

//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     const body = await req.json();
//     const {
//       firstName,
//       lastName,
//       jobTitle,
//       address,
//       phone,
//       email,
//       education,
//       experience,
//       skills,
//       themeColor,
//       summery,
//     } = body;

//     if (!id || !createdBy) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const user = await UserModel.findOne({ email: createdBy });
//     if (!user) {
//       return NextResponse.json(
//         { success: false, error: "User not found" },
//         { status: 404 }
//       );
//     }

//     const resume = await ResumeModel.findById(id);
//     if (!resume) {
//       return NextResponse.json(
//         { success: false, error: "Resume not found" },
//         { status: 404 }
//       );
//     }

//     if (resume.createdBy.toString() !== user._id.toString()) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized access" },
//         { status: 403 }
//       );
//     }

//     const updatedResume = await ResumeModel.findByIdAndUpdate(
//       id,
//       {
//         personal_info: {
//           firstName,
//           lastName,
//           email,
//           phone,
//           address,
//           jobTitle,
//           themeColor,
//           summery,
//         },
//         education,
//         experience,
//         skills,
//       },
//       { new: true, runValidators: true }
//     );

//     return NextResponse.json(
//       { success: true, data: updatedResume },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//     return NextResponse.json(
//       { success: false, error: "Server Error" },
//       { status: 500 }
//     );
//   }
// }
