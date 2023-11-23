import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "../../database.types";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const { searchParams } = new URL(req.url);
  const userid = searchParams.get("userid");
  const cards = searchParams.get("cards");
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  ///si la session es igual a el userID es para modificar el trade de el userId que es el usuario que envia los datos
  /* if (session?.user.id == userid) {
    //test busqueda de LOS TRADERS
    const filter = `user_2.eq.${userid},user_1.eq.${userid},user_2.eq.${session?.user.id},user_1.eq.${session?.user.id}`;

    const data = await supabase
      .from("traders_cards")
      .select("*")
         .eq("user_2", userid)
      .eq("user_1", session.user.id as string) 
       .or(`user_1.eq.${userid},user_2.eq.${session?.user.id}`) 
      .or(filter)
      .single();
    console.log("data---->", data);

    //test crear o upgradear un trader
    return NextResponse.redirect(new URL("/exchange", req.url), {
      status: 302,
    });
  } */
  ///si el userid no es el mismo que el de la sesion creo un trade para la sesion y el userid que serian los dos users
  if (session) {
    const { error } = await supabase.from("traders_cards").upsert({
      user_1: session.user.id,
      user_2: userid,
      cards_user_1: JSON.parse(cards as string),
      cards_user_2: JSON.parse("[]"),
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
