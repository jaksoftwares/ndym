import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum([
    "SUPER_ADMIN",
    "DIOCESE_ADMIN",
    "ARCHDEACONRY_ADMIN",
    "DEANERY_ADMIN",
    "PARISH_ADMIN",
    "CHURCH_LEADER",
  ]),
  diocese_id: z.string().uuid().optional(),
  archdeaconry_id: z.string().uuid().optional(),
  deanery_id: z.string().uuid().optional(),
  parish_id: z.string().uuid().optional(),
  church_id: z.string().uuid().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
