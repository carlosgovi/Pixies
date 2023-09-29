"use client";
import { useEffect, useCallback, useState } from "react";
import React from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import style from "./modalSelectCards.module.css";
import ListCard from "../components/listCard";
import { getProfileDB } from "../lib/db/navInventaryDB";
import Card from "../components/card";
import Image from "next/image";
import buttonRed from "../assets/icons/buttonRed.gif";
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
  onCloseModal,
}: {
  session: Session | null;
  profile: Profiles;
  onCloseModal: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [profileUser, setProfileUser] = useState<Profiles>({} as Profiles);
  const [cardsUser, setCardsUser] = useState([] as any);
  const [cardsSelecteds, setCardsSelecteds] = useState([] as any);

  console.log("las Session", session);
  const user = session?.user;
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getProfileDB(user);

      if (data) {
        setCardsUser(data.cards as any);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    getProfile();
  }, [getProfile, user]);
  console.log("lista de cartas seleccionadas", cardsSelecteds);

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
                getProfile();
                onCloseModal();
              }}
            >
              <PixelArtButton color="rojo" />
            </div>
            <div>
              <PixelArtButton color="verde" />
            </div>
          </div>

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
