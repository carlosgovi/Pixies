import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "../../database.types";
import { setTimeout } from "timers/promises";

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
  //////////TEST UPSERT
  async function upsertCheckState({
    id,
    userSession,
    check,
    userNumber,
  }: {
    id: string | null;
    userSession: string | null;
    check: string | null;
    userNumber: string | null;
  }) {
    try {
      const data = await supabase.from("traders_cards").upsert({
        id: id,
        [`user_${userNumber}`]: userSession,
        [`check_user_${userNumber}`]: check,
      });
    } catch {
      console.log(" error change state check");
    }
  }

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    if (userNumber == "1") {
      upsertCheckState({
        id: tradeid,
        userSession: session.user.id,
        check: check,
        userNumber: userNumber,
      });
    }
    if (userNumber == "2") {
      upsertCheckState({
        id: tradeid,
        userSession: session.user.id,
        check: check,
        userNumber: userNumber,
      });
    }
    /// datos de la DB de  traders_cards
    const data = await supabase
      .from("traders_cards")
      .select("*")
      .eq("id", tradeid);
    if (data) {
      const DB: any = data.data;
      const userOneStateCheck = DB[0].check_user_1;
      const userTwoStateCheck = DB[0].check_user_2;

      ///Si los dos users en la DB tienen el check en True hay que hacer el traspaso de las cartas
      if (userOneStateCheck == true && userTwoStateCheck == true) {
        console.log("Proceso de traspaso de cartas");
        //// me traigo los datos de las cartas que van a pasar los users
        const userOneId = DB[0].user_1;
        const userTwoId = DB[0].user_2;

        const cardsUserOne = DB[0].cards_user_1;
        const cardsUserTwo = DB[0].cards_user_2;

        /// me traigo las cartas de los users
        const { data: dataUserOne } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userOneId);
        const { data: dataUserTwo } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userTwoId);
        if (dataUserOne && dataUserTwo) {
          /////  Preparo para el traspaso
          const currentsCardsUserONE: any = dataUserOne[0].cards;

          const newCardsUserOne = [...currentsCardsUserONE, ...cardsUserTwo];

          const currentsCardsUserTWO: any = dataUserTwo[0].cards;

          const newCardsUserTwo = [...currentsCardsUserTWO, ...cardsUserOne];

          /// Elimino las cartas que envio
          const cardsModificatedUserOne = newCardsUserOne.filter((card) => {
            let cards;
            for (let i = 0; i < cardsUserOne.length; i++) {
              if (card.id === cardsUserOne[i].id) {
                cards = false;
                break;
              } else {
                cards = true;
              }
            }

            return cards;
          });

          const cardsModificatedUserTwo = newCardsUserTwo.filter((card) => {
            let cards;
            for (let i = 0; i < cardsUserTwo.length; i++) {
              if (card.id === cardsUserTwo[i].id) {
                cards = false;
                break;
              } else {
                cards = true;
              }
            }

            return cards;
          });

          const nameFunction = "update_profile" as never;
          const { data: data1, error: error } = await supabase.rpc(
            nameFunction,
            {
              user_id: userOneId,
              updated_data: { cards: cardsModificatedUserOne },
            } as any
          );

          const { data: data2, error: error2 } = await supabase.rpc(
            nameFunction,
            {
              user_id: userTwoId,
              updated_data: { cards: cardsModificatedUserTwo },
            } as any
          );
          if (data1 === null && data2 === null) {
            console.log("CHANGE STATE TRADE");
            const { data, error } = await supabase
              .from("traders_cards")
              .upsert({
                id: tradeid,
                user_1: session.user.id,
                _status: "complete",
              });
          }
        }
      }
    }
  }

  return NextResponse.redirect(new URL("/exchange", req.url), {
    status: 302,
  });
}
