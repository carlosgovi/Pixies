"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../database.types";
import Avatar from "../components/avatar/avatar";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import style from "./account.module.css";
import Menu from "../components/menu";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username,  avatar_url`)
        .eq("id", user?.id as string)
        .single();

      if (error && status !== 406) {
        throw error;
      }

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
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,

        full_name: fullname,

        username,

        avatar_url,

        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
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
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, avatar_url: url });
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
            setAvatarUrl(url);
            updateProfile({ fullname, username, avatar_url: url });
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
