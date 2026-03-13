import { z } from "zod"

export const youthSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  date_of_birth: z.string().or(z.date()),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  church_id: z.string().uuid("Invalid church selection"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  residence: z.string().min(2, "Residence is required"),
  status: z.enum(["STUDENT", "WORKING", "SELF_EMPLOYED", "OTHER"]),
  occupation_info: z.string().optional(),
  is_baptized: z.boolean().default(false),
  is_confirmed: z.boolean().default(false),
  is_saved: z.boolean().default(false),
  ministry_role: z.string().default("Member"),
  leader_position: z.string().optional(),
  photo_url: z.string().url("Invalid photo URL").optional(),
  comments: z.string().optional(),
})

export type YouthInput = z.infer<typeof youthSchema>
