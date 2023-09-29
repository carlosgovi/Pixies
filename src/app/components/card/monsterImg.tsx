"use client";
import React, { useEffect, useState } from "react";
import { Database } from "../../database.types";
import Image from "next/image";
import styles from "./styles.module.css";
import { getImgMosterDB } from "@/app/lib/db/monsterImgDB";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
export default function MonsterImg({
  url,
  size,
}: {
  url: Profiles["avatar_url"];
  size: number;
}) {
  const [monsterUrl, setMonsterUrl] = useState<Profiles["avatar_url"]>("");
  //add loading state in future
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const url = await getImgMosterDB(path);
        setMonsterUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url]);

  return (
    <>
      {monsterUrl ? (
        <Image
          width={size}
          height={size}
          src={monsterUrl}
          alt="Monster"
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
