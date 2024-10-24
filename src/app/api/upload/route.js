import { existsSync, mkdirSync } from "fs";
import { readdir, unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

// GET method to fetch all images
export const GET = async () => {
  try {
    const files = await readdir("./public/images");
    return NextResponse.json({ msg: "Images fetched successfully", files });
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return NextResponse.json(
      { msg: "Failed to fetch images", error: error.message },
      { status: 500 }
    );
  }
};

// DELETE method to delete an image
export const DELETE = async (request) => {
  try {
    const imageName = request.nextUrl.searchParams.get("image");

    if (existsSync(`./public/images/${imageName}`)) {
      await unlink(`./public/images/${imageName}`);
      return NextResponse.json({ msg: "Image deleted successfully" });
    } else {
      return NextResponse.json({ msg: "Image not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to delete image:", error);
    return NextResponse.json(
      { msg: "Failed to delete image", error: error.message },
      { status: 500 }
    );
  }
};

// POST method to upload an image
export const POST = async (request) => {
  try {
    const file = await request.formData();
    const image = file.get("image");

    if (!image) {
      return NextResponse.json({ msg: "No image uploaded" }, { status: 400 });
    }

    const byteLength = await image.arrayBuffer();
    const bufferData = Buffer.from(byteLength);

    const imagesDir = "./public/images";
    if (!existsSync(imagesDir)) {
      mkdirSync(imagesDir, { recursive: true });
    }

    const pathOfImage = `${imagesDir}/${new Date().getTime()}${path.extname(
      image.name
    )}`;
    await writeFile(pathOfImage, bufferData);

    return NextResponse.json({
      msg: "Image uploaded successfully",
      path: pathOfImage,
    });
  } catch (error) {
    console.error("Failed to upload image:", error);
    return NextResponse.json(
      { msg: "Failed to upload image", error: error.message },
      { status: 500 }
    );
  }
};
