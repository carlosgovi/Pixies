"use client";
import { useCallback, useEffect, useState } from "react";
import Avatar from "../components/avatar/avatar";
import { Session } from "@supabase/auth-helpers-nextjs";
import style from "./account.module.css";
import Menu from "../components/menu";
import { getDataProfile, uploadDataProfile } from "../lib/db/accound-formDB";

export default function AccountForm({ session }: { session: Session | null }) {
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data } = await getDataProfile(user);
      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    fullname,
    username,
    avatar_url,
  }: {
    fullname: string | null;
    username: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);
      await uploadDataProfile({
        user,
        fullname,
        username,
        avatar_url,
      });
    } catch (error) {
      alert("Error updating the data! ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={style.form_container}>
      <Menu />
      <div className={style.avatar_desktop}>
        <Avatar
          uid={user?.id as string}
          url={avatar_url}
          size={375}
          editVisible={true}
          onUpload={(urlavatar) => {
            setAvatarUrl(urlavatar);
            updateProfile({ fullname, username, avatar_url: urlavatar });
          }}
        />
      </div>
      <div className={style.form_container_global}>
        <Avatar
          uid={user?.id as string}
          url={avatar_url}
          size={170}
          editVisible={true}
          onUpload={(url) => {
            updateProfile({ fullname, username, avatar_url: url });
            setAvatarUrl(url);
          }}
        />
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
          <input
            className={style.input}
            id="fullName"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className={style.input_container}>
          <label style={{ margin: "0" }} htmlFor="username">
            Avatar
          </label>
          <input
            className={style.input}
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={style.button_container}>
          <button
            style={{ textShadow: "black 0.1em 0.1em 0.2em" }}
            className="button primary block"
            onClick={() => updateProfile({ fullname, username, avatar_url })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Guardar"}
          </button>
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
}
