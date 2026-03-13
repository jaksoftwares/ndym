import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { youthSchema } from "@/lib/validations/youth"
import { createAuditLog } from "@/lib/audit"

// GET /api/youth - List all youth (Admin only)
export async function GET(req: Request) {
  const supabase = await createClient()
  
  // 1. Check Auth
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 2. Get Admin Profile for scoping
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 403 })
  }

  // 3. Build Query based on filters and scope
  const { searchParams } = new URL(req.url)
  const churchId = searchParams.get("church_id")
  const parishId = searchParams.get("parish_id")
  
  let query = supabase.from("youth_full_details").select("*")

  // Apply scope restrictions based on role
  if (profile.role === "CHURCH_LEADER") query = query.eq("church_id", profile.church_id)
  else if (profile.role === "PARISH_ADMIN") query = query.eq("parish_id", profile.parish_id)
  else if (profile.role === "DEANERY_ADMIN") query = query.eq("deanery_id", profile.deanery_id)
  else if (profile.role === "ARCHDEACONRY_ADMIN") query = query.eq("archdeaconry_id", profile.archdeaconry_id)
  else if (profile.role === "DIOCESE_ADMIN") query = query.eq("diocese_id", profile.diocese_id)
  // SUPER_ADMIN sees all

  // Apply additional query filters
  if (churchId) query = query.eq("church_id", churchId)
  if (parishId) query = query.eq("parish_id", parishId)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST /api/youth - Register a new youth (Public)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = youthSchema.parse(body)
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("youths")
      .insert(validatedData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}