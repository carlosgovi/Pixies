"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
import React from "react";
import style from "./notificationTrade.module.css";
import Card from "../components/card";
import PixelArtButton from "../ui/buttons/buttonPixel";
import useGetUserProfile from "../hooks/useGetProfile";
import ModalSelectCards from "./modalSelectCards";
import useCheckNotificationTrade from "../hooks/useCheckNotificationTrade";
import useGetNotificationTrader from "../hooks/useGetNotificationTeader";
interface Profiles {
  id: string;
  avatar_url: string | null;
  full_name: string | null;
  username: string | null;
  cards: [];
}
const NotificationTrade = ({
  session,
  trader,
  notificationSelectCart,
}: {
  session: Session | null;
  trader: any;
  notificationSelectCart: ({}: any) => void;
}) => {
  /* const ProfileUser = ProfileStore(); */
  const { data: userOne } = useGetUserProfile(trader.user_1);
  const { data: userTwo } = useGetUserProfile(trader.user_2);
  const { refetch } = useGetNotificationTrader(session?.user.id);
  const checkBoxNotifi = useCheckNotificationTrade;

  async function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("CHANGE------>", event.target.checked);

    const check = event.target.checked;
    if (session?.user.id == userOne?.id) {
      try {
        fetch(
          `http://localhost:3000/exchange/trade-check?check=${check}&tradeid=${trader.id}&usernumber=1`,
          {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            refetch();
            return res.json();
          })
          .catch((err) => {
            refetch();
            console.log("check");
          });
      } catch (error) {
        console.log("change state", error);
      }
    }
    if (session?.user.id == userTwo?.id) {
      try {
        fetch(
          `http://localhost:3000/exchange/trade-check?check=${check}&tradeid=${trader.id}&usernumber=2`,
          {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            refetch();
            return res.json();
          })
          .catch((err) => {
            console.log("check");
            refetch();
          });
      } catch (error) {
        console.log("error", error);
      }
    }
  }
  function handleClickCards(user: string, tradererId: string) {
    return () => {
      /* console.log(user); */

      if (user == session?.user.id) {
        if (user == userOne?.id && trader?.cards_user_1.length === 0) {
          notificationSelectCart({
            userId: session?.user.id,
            traderId: tradererId,
          });
        }
      }

      if (user == session?.user.id) {
        if (user == userTwo?.id && trader?.cards_user_2.length === 0) {
          notificationSelectCart({
            userId: session?.user.id,
            traderId: tradererId,
          });
        }
      }
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
              onClick={handleClickCards(trader.user_1, trader.id)}
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
              onClick={handleClickCards(trader.user_2, trader.id)}
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
                onChange={(e) => handleCheckbox(e)}
                style={{ width: "30px", height: "30px" }}
                className="checkbox"
                type="checkbox"
                name="checkuser1"
                checked={trader.check_user_1}
              />
            </div>
            <div className={style.checkbox}>
              <input
                onChange={(e) => handleCheckbox(e)}
                style={{ width: "30px", height: "30px" }}
                className="checkbox"
                type="checkbox"
                name="checkuser2"
                checked={trader.check_user_2}
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
