import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {

  const supabase = createClient()

  const data = await req.json()

  const { error } = await supabase
    .from("youth_members")
    .insert(data)

  if (error) {
    return NextResponse.json({ error: error.message })
  }

  return NextResponse.json({ success: true })
}