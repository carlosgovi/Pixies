"use client";
import React, { useEffect, useState } from "react";
import { Database } from "../../database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import styles from "./styles.module.css";

export default function MonsterImg({
  url,
  size,
}: {
  url: Profiles["avatar_url"];
  size: number;
}) {
  const supabase = createClientComponentClient<Database>();
  const [monsterUrl, setMonsterUrl] = useState<Profiles["avatar_url"]>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("monsters")

          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setMonsterUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  return (
    <>
      {monsterUrl ? (
        <Image
          width={size}
          height={size}
          src={monsterUrl}
          alt="Avatar"
          className={styles.monster}
          style={{
            width: size,
            height: size,
            filter: "drop-shadow(0px 0px 20px black)",
          }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
    </>
  );
}
