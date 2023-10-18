"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
import React from "react";
import style from "./notificationTrade.module.css";
import Card from "../components/card";
import PixelArtButton from "../ui/buttons/buttonPixel";
import useGetUserProfile from "../hooks/useGetProfile";

const NotificationTrade = ({
  session,
  trader,
}: {
  session: Session | null;
  trader: any;
}) => {
  /* const ProfileUser = ProfileStore(); */
  const { data: userOne } = useGetUserProfile(trader.user_1);
  const { data: userTwo } = useGetUserProfile(trader.user_2);
  function handleClickCards(user: any) {
    return () => {
      console.log(user);
    };
  }
  console.log("los datos de cada notificacion", trader);
  function handlerStateTrade() {
    if (trader._status === "pending") {
      return (
        <div className={style.container_notificationTrade}>
          <div className={style.container_x}>
            <form
              action={
                `/exchange/clear-trade?tradeid=${trader.id}` +
                `&userid=${session?.user.id}`
              }
              method="post"
            >
              <button>
                <PixelArtButton color="rojo" size={40} />
              </button>
            </form>
          </div>
          <div className={style.container_username}>
            <div className={style.username}>{userOne?.username}</div>
            <div className={style.username}>{userTwo?.username}</div>
          </div>

          <div className={style.container_cards}>
            <div
              className={style.modal_header}
              onClick={handleClickCards(trader.user_1)}
            >
              <div className={style.modal_cards_list_selected_conteiner}>
                {trader.cards_user_1 ? (
                  trader.cards_user_1.map((card: any) => (
                    <div
                      className={style.modal_cards_list_selected}
                      //rotar cartas de manera ramdom 20° para cada lado de cada carta
                      style={{
                        transform: `rotate(${Math.random() * 20 - 25}deg)`,
                      }}
                      key={card.id}
                    >
                      <Card data={card} implementModal={false} />
                    </div>
                  ))
                ) : (
                  <div className={style.modal_cards_list_selected}></div>
                )}
              </div>
            </div>
            <div
              className={style.modal_header}
              onClick={handleClickCards(trader.user_2)}
            >
              <div className={style.modal_cards_list_selected_conteiner}>
                {trader.cards_user_2 ? (
                  trader.cards_user_2.map((card: any) => (
                    <div
                      className={style.modal_cards_list_selected}
                      //rotar cartas de manera ramdom 20° para cada lado de cada carta
                      style={{
                        transform: `rotate(${Math.random() * 20 - 25}deg)`,
                      }}
                      key={card.id}
                    >
                      <Card data={card} implementModal={false} />
                    </div>
                  ))
                ) : (
                  <div className={style.modal_cards_list_selected}></div>
                )}
              </div>
            </div>
          </div>
          <div className={style.container_checkbox}>
            <div className={style.checkbox}>
              <input
                style={{ width: "30px", height: "30px" }}
                className="checkbox"
                type="checkbox"
                name="checkuser1"
              />
            </div>
            <div className={style.checkbox}>
              <input
                style={{ width: "30px", height: "30px" }}
                className="checkbox"
                type="checkbox"
                name="checkuser2"
              />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  return handlerStateTrade();
};

export default NotificationTrade;
