import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import SelectUser from "./selectUser";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session === null) {
    redirect("/");
  }
  return <SelectUser session={session} />;
}
