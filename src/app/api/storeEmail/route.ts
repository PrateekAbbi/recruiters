import { connectToDB } from "@/lib/mongoDB";
import Recruiter from "@/lib/Recruiters";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    const existingRecruiter = await Recruiter.findOne({ email });

    if (existingRecruiter) {
      return new NextResponse(
        "You have already sent the mail to this recruiter",
        { status: 400 }
      );
    }

    // Store the email in the database
    const newRecruiter = await Recruiter.insertOne({
      email,
      name,
    });

    await newRecruiter.save();

    return NextResponse.json(newRecruiter, { status: 200 });
  } catch (error) {
    console.error("Error storing email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();

    const recruiters = await Recruiter.find().sort({ sentAt: "desc" });

    return NextResponse.json({ success: true, recruiters }, { status: 200 });
  } catch (error) {
    console.error("Error retreiveing data:", error);
    return NextResponse.json(
      { error: "Error fetching emails" },
      { status: 500 }
    );
  }
}
