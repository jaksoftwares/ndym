import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary/config"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Cloudinary expects base64 or a stream
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`
    
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: "ndym_youth_profiles",
    })

    return NextResponse.json({ url: result.secure_url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}