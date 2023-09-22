import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  try {
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      console.log("Datos de la sesion", session.user.id);
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`cards`)
        .eq("id", session.user.id as string)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data?.cards == null) {
        //si no esxisten cards ingreso en la base de datos un json con una card por defecto

        //generar valor en string random de "fire" o "water" o "plant"
        const typeRamdom = Math.floor(Math.random() * 3);
        const type =
          typeRamdom === 0 ? "fire" : typeRamdom === 1 ? "water" : "plant";
        await supabase.from("profiles").upsert({
          id: session.user.id as string,
          cards: [
            {
              id: 1,
              atk: (Math.floor(Math.random() * 40) + 1).toString(),
              def: (Math.floor(Math.random() * 40) + 1).toString(),
              stars: 0,
              type: type,
              rarity: "normal",
              monster: "monster_1.gif",
            },
          ],
        });

        console.log("Monster otrogado a user nuevo");
      }
    }
  } catch (error) {
    console.log(error);
  }

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/account", req.url));
}
