import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { youthSchema } from "@/lib/validations/youth"
import { createAuditLog } from "@/lib/audit"

// GET /api/youth/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase
    .from("youth_full_details")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Youth record not found" }, { status: 404 })
  }

  // TODO: Add RBAC check to ensure admin is in scope of this youth record

  return NextResponse.json(data)
}

// PUT /api/youth/[id]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const validatedData = youthSchema.parse(body)
    const supabase = await createClient()

    const { data: oldData } = await supabase.from("youths").select("*").eq("id", id).single()

    const { data, error } = await supabase
      .from("youths")
      .update(validatedData)
      .eq("id", id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    await createAuditLog({
      action: "UPDATE",
      target_table: "youths",
      target_id: id,
      old_data: oldData,
      new_data: data,
    })

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// DELETE /api/youth/[id]
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: oldData } = await supabase.from("youths").select("*").eq("id", id).single()

  const { error } = await supabase
    .from("youths")
    .delete()
    .eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  await createAuditLog({
    action: "DELETE",
    target_table: "youths",
    target_id: id,
    old_data: oldData,
  })

  return NextResponse.json({ message: "Record deleted successfully" })
}
