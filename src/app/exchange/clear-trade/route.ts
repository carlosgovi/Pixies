import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userid = searchParams.get("userid");
  const tradeId = searchParams.get("tradeid");
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { error } = await supabase.from("traders_cards").upsert([
      { user_1: userid, id: tradeId, _status: "deleted" }, // Marca el registro como "deleted" para su eliminación.
    ]);
    console.log("borrando trade");

    if (error) throw error;
  }

  return NextResponse.redirect(new URL("/exchange", req.url), {
    status: 302,
  });
}
