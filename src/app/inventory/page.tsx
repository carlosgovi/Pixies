import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import NavInventory from "./navInventory";
export const dynamic = "force-dynamic";
export default async function Inventory() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <NavInventory session={session} />;
}
