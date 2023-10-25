"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import style from "./modalSelectCards.module.css";
import ListCard from "../components/listCard";
import useGetProfile from "../hooks/useGetProfile";
import Card from "../components/card";
import PixelArtButton from "../ui/buttons/buttonPixel";

interface Profiles {
  id: string;
  avatar_url: string | null;
  full_name: string | null;
  username: string | null;
  cards: [];
}
const ModalSelectCards = ({
  session,
  profile,
  tradeId,
  onCloseModal,
}: {
  tradeId: string | null;
  session: Session | null;
  profile: Profiles;
  onCloseModal: () => void;
}) => {
  const [cardsUser, setCardsUser] = useState([] as any);
  const [cardsSelecteds, setCardsSelecteds] = useState([] as any);
  const user = session?.user;
  const { data, isLoading } = useGetProfile(user?.id);

  useEffect(() => {
    if (data) {
      setCardsUser(data.cards as any);
    }
  }, [data]);
  console.log("TEST_____>", session?.user.id, profile.id);

  return (
    <>
      <div className={style.modal_conteiner}>
        <div className={style.modal}>
          <div className={style.modal_header}>
            {cardsSelecteds.length > 0 ? (
              <div className={style.modal_cards_list_selected_conteiner}>
                {cardsSelecteds.map((card: any) => (
                  <div
                    className={style.modal_cards_list_selected}
                    //rotar cartas de manera ramdom 20° para cada lado de cada carta
                    style={{
                      transform: `rotate(${Math.random() * 40 - 35}deg)`,
                    }}
                    key={card.id}
                  >
                    <Card data={card} implementModal={false} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className={style.modal_buttons_conteiner}>
            <div
              onClick={() => {
                setCardsSelecteds([]);

                onCloseModal();
              }}
            >
              <PixelArtButton color="rojo" size={80} />
            </div>
            <div>
              <div>
                <form
                  action={
                    session?.user.id && profile.id === undefined
                      ? `/exchange/card-selecteds-trade-notification?cards=${JSON.stringify(
                          cardsSelecteds
                        )}&tradeid=${tradeId}`
                      : `/exchange/cards-selecteds?cards=${JSON.stringify(
                          cardsSelecteds
                        )}&userid=${profile.id}`
                  }
                  method="post"
                >
                  <button
                    style={{ textShadow: "black 0.1em 0.1em 0.2em" }}
                    className="button block"
                    type="submit"
                  >
                    <PixelArtButton color="verde" size={80} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {isLoading && <div className={style.modal_loader}>loading...</div>}
          <div className={style.modal_cards_list}>
            <ListCard
              data={cardsUser}
              implementModal={false}
              onSelectCard={(card) => {
                setCardsSelecteds([...cardsSelecteds, card]);
                //luego tal ves marcar las cartas seleccionadas o quitarlas de la lista
                setCardsUser(
                  cardsUser.filter((cardss: any) => cardss !== card)
                );
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSelectCards;
