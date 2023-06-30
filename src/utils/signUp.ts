"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { InferModel } from "drizzle-orm"
import { cookies } from "next/headers"

import { db } from "@/db/db"
import { users } from "@/db/schema"

type DbUser = InferModel<typeof users, "insert">

export const signUp = async (email: string, password: string) => {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }

  if (data.user) {
    const newUser: DbUser = {
      id: data.user.id,
    }

    const u = await db.insert(users).values(newUser).returning()

    return u[0]
  }

  return null
}
