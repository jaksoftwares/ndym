import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary/config"

export async function POST(req: Request) {
  const body = await req.json()

  const result = await cloudinary.uploader.upload(body.image, {
    folder: "youth_profiles",
  })

  return NextResponse.json({ url: result.secure_url })
}