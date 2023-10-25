import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "../../database.types";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const { searchParams } = new URL(req.url);
  const tradeid = searchParams.get("tradeid");
  const check = searchParams.get("check");
  const userNumber = searchParams.get("usernumber");
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const checkboolean = new Boolean(check as string);
  checkboolean.valueOf();
  console.table({ tradeid, check, checkboolean });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    if (userNumber == "1") {
      const data = await supabase.from("traders_cards").upsert({
        id: tradeid,
        user_1: session.user.id,
        check_user_1: check,
      });
      console.log("data---->", data);
    }
    if (userNumber == "2") {
      const data = await supabase.from("traders_cards").upsert({
        id: tradeid,
        user_2: session.user.id,
        check_user_2: check,
      });
      console.log("data---->", data);
    }
  }

  return NextResponse.redirect(new URL("/exchange", req.url), {
    status: 302,
  });
}
