"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import style from "./selectUser.module.css";
import Menu from "../components/menu";
import Avatar from "../components/avatar/avatar";
import { getDataProfilesByUserNameDB } from "../lib/db/selectUserDB";
import ModalSelectCards from "./modalSelectCards";
import NotificationTrade from "./notificationTrade";
import PixelArtButton from "../ui/buttons/buttonPixel";
import useGetNotificationTrader from "../hooks/useGetNotificationTeader";
import { Icon } from "@iconify/react";

interface Profiles {
  id: string;
  avatar_url: string | null;
  full_name: string | null;
  username: string | null;
  cards: [];
}
const SelectUser = ({ session }: { session: Session | null }) => {
  const [userName, setUserName] = useState(" ");
  const [seachingUser, setSeachingUser] = useState(null as Profiles[] | null);
  const [userSelected, setUserSelected] = useState(null as Profiles | null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataTraders, setDataTraders] = useState([] as any);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingNotification, setLoadingNotification] = useState(false);
  const user = session?.user;
  const { data } = useGetNotificationTrader(user?.id);

  async function getSearchUser({ username }: { username: string }) {
    try {
      setLoadingUsers(true);

      let { data } = await getDataProfilesByUserNameDB(username);

      if (data.length > 0) {
        setSeachingUser([]);
        setSeachingUser(data as any);
      }
    } catch (error) {
      alert("Error updating the data! ");
    } finally {
      setLoadingUsers(false);
    }
  }
  function handlerClickSelectUser(profile: Profiles) {
    setUserSelected(profile);
    setModalVisible(true);
  }
  function modal(profile: Profiles) {
    return (
      <ModalSelectCards
        session={session}
        profile={profile}
        onCloseModal={() => setModalVisible(false)}
      />
    );
  }
  function notifications() {
    return (
      <div className={style.user_container}>
        {!loadingNotification ? (
          <Icon
            icon="svg-spinners:eclipse-half"
            color="rgb(200, 200, 200, 0.3)"
            width="100"
            height="100"
          />
        ) : null}
        {dataTraders
          ? dataTraders.map((trader: any, index: any) => (
              <NotificationTrade
                trader={trader}
                key={index}
                session={session}
              />
            ))
          : null}
      </div>
    );
  }
  function seachingUsers() {
    return (
      <div className={style.user_container}>
        {loadingUsers ? (
          <Icon
            icon="svg-spinners:eclipse-half"
            color="rgb(200, 200, 200, 0.3)"
            width="100"
            height="100"
          />
        ) : null}
        {seachingUser
          ? seachingUser.map((profile: Profiles, index) => (
              <div
                onClick={() => {
                  handlerClickSelectUser(profile);
                }}
                className={style.user}
                key={index}
              >
                <div className={style.avatar_container}>
                  <Avatar
                    uid={profile.id}
                    url={
                      profile.avatar_url !== null
                        ? profile.avatar_url
                        : "camera_default.gif"
                    }
                    size={150}
                    onUpload={() => {}}
                    editVisible={false}
                  />
                </div>
                <div className={style.username}>{profile.username}</div>
              </div>
            ))
          : null}
      </div>
    );
  }
  useEffect(() => {
    if (data) {
      setLoadingNotification(true);
      setDataTraders(data);
    }
  }, [data]);

  return (
    <div>
      {modalVisible ? modal(userSelected as Profiles) : null}

      <div className={style.form_container}>
        <Menu />
        <div className={style.form_container_global}>
          <div className={style.form_title}>Selecciona el usuario</div>
          <div className={style.input_container}>
            <input
              className={style.input}
              placeholder="Buscar usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              maxLength={8} // Limita la entrada a 8 caracteres
            />
            <div
              className={style.button_conteiner}
              onClick={() => getSearchUser({ username: userName })}
            >
              <PixelArtButton color="azul" size={70} />
            </div>
          </div>
        </div>
      </div>

      <div className={style.user_container}>
        {seachingUsers()}
        {notifications()}
      </div>
    </div>
  );
};

export default SelectUser;
