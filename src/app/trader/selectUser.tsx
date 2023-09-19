import React from "react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import style from "./selectUser.module.css";
import Menu from "../components/menu";
import Avatar from "../components/avatar/avatar";
const SelectUser = ({ session }: { session: Session | null }) => {
  return (
    <div className={style.form_container}>
      <Menu />
      <div className={style.avatar_desktop}>
        {/* <Avatar
          uid={user?.id as string}
          url={avatar_url}
          size={375}
          editVisible={true}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, avatar_url: url });
          }}
        /> */}
      </div>
      <div className={style.form_container_global}>
        {/*  <Avatar
          uid={user?.id as string}
          url={avatar_url}
          size={170}
          editVisible={true}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, avatar_url: url });
          }}
        /> */}
        <div className={style.input_container}>
          <label style={{ margin: "0" }} htmlFor="email">
            Email
          </label>
          <input
            className={style.input}
            id="email"
            type="text"
            value={session?.user.email}
            disabled
          />
        </div>
        <div className={style.input_container}>
          <label style={{ margin: "0" }} htmlFor="fullName">
            Nombre Completo
          </label>
          {/*    <input
            className={style.input}
            id="fullName"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
          /> */}
        </div>
        <div className={style.input_container}>
          <label style={{ margin: "0" }} htmlFor="username">
            Avatar
          </label>
          {/*  <input
            className={style.input}
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
        </div>

        <div className={style.button_container}>
          {/*  <button
            style={{ textShadow: "black 0.1em 0.1em 0.2em" }}
            className="button primary block"
            onClick={() => updateProfile({ fullname, username, avatar_url })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Guardar"}
          </button> */}
        </div>

        <div className={style.button_container}>
          <form action="/auth/signout" method="post">
            <button
              style={{ textShadow: "black 0.1em 0.1em 0.2em" }}
              className="button block"
              type="submit"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectUser;
