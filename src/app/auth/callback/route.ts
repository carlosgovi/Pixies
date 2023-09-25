import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import type { Database } from "../../database.types";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });
    await supabase.auth.exchangeCodeForSession(code);
    try {
      // Check if we have a session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
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
          const types = () => {
            const typeRamdom = Math.floor(Math.random() * 3);
            const type =
              typeRamdom === 0 ? "fire" : typeRamdom === 1 ? "water" : "plant";
            return type;
          };

          const rarities = () => {
            const rarityRamdom = Math.floor(Math.random() * 2);
            const rarity = rarityRamdom === 0 ? "normal" : "rare";
            return rarity;
          };
          await supabase.from("profiles").upsert({
            id: session.user.id as string,
            cards: [
              {
                id: 1,
                atk: (Math.floor(Math.random() * 40) + 1).toString(),
                def: (Math.floor(Math.random() * 40) + 1).toString(),
                stars: 1,
                type: types(),
                rarity: rarities(),
                monster_pick: "monster_1.gif",
              },
              {
                id: 2,
                atk: (Math.floor(Math.random() * 40) + 1).toString(),
                def: (Math.floor(Math.random() * 40) + 1).toString(),
                stars: 2,
                type: types(),
                rarity: rarities(),
                monster_pick: "monster_2.gif",
              },
              {
                id: 3,
                atk: (Math.floor(Math.random() * 40) + 1).toString(),
                def: (Math.floor(Math.random() * 40) + 1).toString(),
                stars: 4,
                type: types(),
                rarity: rarities(),
                monster_pick: "monster_3.gif",
              },
            ],
          });

          console.log("Monster cards created for user");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return NextResponse.redirect(new URL("/account", req.url));
}
