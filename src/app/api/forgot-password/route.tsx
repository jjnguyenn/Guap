// src/app/api/forgot-password/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/dbconnections/change_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        email,
        connection: "Username-Password-Authentication", // Auth0 default database connection
      }),
    });

    const data = await response.text(); // Auth0 returns a plain text message

    if (response.ok) {
      return NextResponse.json({
        message: "If this email is registered, a password reset link will be sent to your email address.",
      });
    } else {
      return NextResponse.json({ message: data }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in password reset:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
