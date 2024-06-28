import userModel from "@/models/auth";
import { connect } from "@/config/dbConfig";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const { name, email, password } = await req.json();

    const ifuserExists = await userModel.findOne({ email });

    if (ifuserExists) {
      return NextResponse.json(
        {
          success: false,
          message: "user already exists",
        },
        {
          status: 500,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
    });

    newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "user registerd successfully",
        newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
