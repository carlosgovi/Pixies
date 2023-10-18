import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import AccountForm from "./account-form";
///redirecciono a el user si no estas logueado
export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";

export default async function Account() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session === null) {
    redirect("/");
  }
  return <AccountForm session={session} />;
}
