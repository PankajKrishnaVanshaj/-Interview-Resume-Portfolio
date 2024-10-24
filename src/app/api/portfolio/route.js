import path from "path";
import { existsSync, mkdirSync } from "fs";
import { readdir, unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import connectToDatabase from "@/DataBase/connectdb";
import PortfolioModel from "@/DataBase/models/portfolio";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel from "@/DataBase/models/user";

async function connectDB() {
  try {
    await connectToDatabase();
  } catch (error) {
    throw new Error("Database connection error");
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession({ req, authOptions });

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

    const projectsList = await PortfolioModel.find({ createdBy: user._id });

    return NextResponse.json(
      { success: true, data: projectsList },
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

export async function POST(req) {
  let pathOfImage = "";

  try {
    await connectDB();

    const session = await getServerSession({ req, authOptions });

    const formData = await req.formData();

    const projectUrl = formData.get("projectUrl");
    const techStack = formData.get("techStack");
    const projectTitle = formData.get("projectTitle");
    const projectDescription = formData.get("projectDescription");
    const category = formData.get("category");
    const projectImg = formData.get("projectImg");

    const createdBy = session?.user?.email;

    if (
      !projectUrl ||
      !projectTitle ||
      !projectDescription ||
      !projectImg ||
      !createdBy
    ) {
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

    const byteLength = await projectImg.arrayBuffer();
    const bufferData = Buffer.from(byteLength);

    const imagesDir = "./public/images";
    if (!existsSync(imagesDir)) {
      mkdirSync(imagesDir, { recursive: true });
    }

    pathOfImage = `${imagesDir}/${new Date().getTime()}${path.extname(
      projectImg.name
    )}`;
    await writeFile(pathOfImage, bufferData);

    const newProject = new PortfolioModel({
      link: projectUrl,
      tech: techStack.split(","),
      title: projectTitle,
      desc: projectDescription,
      banner: pathOfImage,
      cats: category,
      createdBy: user._id,
    });

    try {
      await newProject.save();
    } catch (saveError) {
      console.error("Error occurred while saving project:", saveError.message);

      // Delete the uploaded image if the save operation fails
      if (existsSync(pathOfImage)) {
        await unlink(pathOfImage);
        console.log("Image deleted due to failed save operation");
      }

      return NextResponse.json(
        { success: false, error: "Server Error during save" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred:", error.message);

    // Delete the uploaded image if any other error occurs
    if (pathOfImage && existsSync(pathOfImage)) {
      await unlink(pathOfImage);
      console.log("Image deleted due to error");
    }

    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

// delete project

export async function DELETE(req) {
  try {
    const session = await getServerSession({ req, authOptions });
    const { id } = await req.json();
    console.log("Project ID:", id);

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing project ID" },
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

    const project = await PortfolioModel.findOne({
      _id: id,
      createdBy: user._id,
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const imagePath = project.banner;

    await PortfolioModel.findByIdAndDelete(id);

    if (imagePath && existsSync(imagePath)) {
      try {
        await unlink(imagePath);
        console.log("Image deleted successfully");
      } catch (unlinkError) {
        console.error(
          "Error occurred while deleting image:",
          unlinkError.message
        );
      }
    }

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" },
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
