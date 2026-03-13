import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { loginSchema, registerSchema } from "@/lib/validations/auth"

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get("action")

  if (action === "login") {
    try {
      const body = await req.json()
      const { email, password } = loginSchema.parse(body)
      const supabase = await createClient()
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return NextResponse.json({ error: error.message }, { status: 401 })
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()
      return NextResponse.json({ user: data.user, profile })
    } catch (e: any) {
      return NextResponse.json({ error: "Invalid login request" }, { status: 400 })
    }
  }

  if (action === "register") {
    try {
      const body = await req.json()
      const validatedData = registerSchema.parse(body)
      const supabase = await createClient()
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
      })
      if (authError || !authData.user) return NextResponse.json({ error: authError?.message || "Registration failed" }, { status: 400 })
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: validatedData.full_name,
        email: validatedData.email,
        role: validatedData.role,
        church_id: validatedData.church_id,
        parish_id: validatedData.parish_id,
        deanery_id: validatedData.deanery_id,
        archdeaconry_id: validatedData.archdeaconry_id,
        diocese_id: validatedData.diocese_id,
      })
      if (profileError) return NextResponse.json({ error: profileError.message }, { status: 400 })
      return NextResponse.json({ message: "Registered successfully", user: authData.user }, { status: 201 })
    } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
  }

  if (action === "logout") {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return NextResponse.json({ message: "Logged out" })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
  return NextResponse.json({ user, profile })
}
