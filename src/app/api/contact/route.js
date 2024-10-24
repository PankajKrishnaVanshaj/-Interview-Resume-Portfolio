import connectToDatabase from "@/DataBase/connectdb";
import ContactModel from "@/DataBase/models/Contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const newContact = new ContactModel(body);
    await newContact.save();

    return NextResponse.json(
      { message: "Contact submitted successfully!" },
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
