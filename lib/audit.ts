import { createClient } from "@/lib/supabase/server"

interface AuditLogOptions {
  action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT"
  target_table: string
  target_id?: string
  old_data?: any
  new_data?: any
}

export async function createAuditLog({
  action,
  target_table,
  target_id,
  old_data,
  new_data,
}: AuditLogOptions) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  await supabase.from("audit_logs").insert({
    admin_id: user.id,
    action,
    target_table,
    target_id,
    old_data,
    new_data,
  })
}
