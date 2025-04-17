// src/app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {

  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("session");
  }


  const response = NextResponse.json({ message: "Logged out" });

  // Clear the cookie by setting it to an empty value and a past expiry date
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), 
    path: "/",
  });


  return response;
}
