import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "../../database.types";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userid = searchParams.get("userid");
  const cards = searchParams.get("cards");
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    //test busqueda de LOS TRADERS
    /*  const filter = `user_2.eq.${userid},user_1.eq.${userid},user_2.eq.${session.user.id},user_1.eq.${session.user.id}`;

    const data = await supabase
      .from("traders_cards")
      .select("*")
      /*    .eq("user_2", userid)
      .eq("user_1", session.user.id as string) */
    /* .or(`user_1.eq.${userid},user_2.eq.${session.user.id}`)
      .or(filter)
      
      .single();
      */
    //test crear o upgradear un trader
    const { error } = await supabase.from("traders_cards").upsert({
      user_1: session.user.id,
      user_2: userid,
      cards_user_1: JSON.parse(cards as string),
      _status: "pending",
      updated_at: new Date().toISOString(),
    });
    console.log("creando trader");

    if (error) throw error;
  }

  return NextResponse.redirect(new URL("/exchange", req.url), {
    status: 302,
  });
}
