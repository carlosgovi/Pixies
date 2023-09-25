"use client";
import React, { useEffect, useState } from "react";
import { Database } from "../../database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { downloadStorageImg, uploadStorageImg } from "@/app/lib/db/avatarDB";
import Camera from "../../assets/icons/camera.gif";
import cameraSvg from "../../assets/icons/camerasvg.svg";
import style from "./styles.module.css";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
  uid,
  url,
  size,
  editVisible,
  onUpload,
}: {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  editVisible: boolean;
  onUpload: (url: string) => void;
}) {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function download(url: string) {
      const urlImg: Profiles["avatar_url"] | undefined =
        await downloadStorageImg(url);
      if (urlImg !== undefined) {
        setAvatarUrl(urlImg);
      }
    }
    if (url) download(url);
  }, [url, supabase]);
  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("selecciona una imagen.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      await uploadStorageImg(filePath, file);
      onUpload(filePath);
    } catch (error) {
      alert("Avatar guardado!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Image
        width={size}
        height={size}
        src={avatarUrl ? avatarUrl : Camera}
        alt="Avatar"
        loader={() =>
          "https://i.pinimg.com/originals/ba/7e/ac/ba7eac09a2f5ff627e3ceadf02cbaa93.gif"
        }
        priority
        className="avatar image"
        style={{
          height: size,
          width: size,
          borderRadius: "50%",
          filter: "drop-shadow(0px 0px 20px black)",
        }}
      />
      {editVisible && (
        <div style={{ width: size }}>
          <label className="button primary block" htmlFor="single">
            <Image
              className={style.edit_icon}
              priority
              src={cameraSvg}
              alt="camera"
              width={50}
              height={50}
            />
            {uploading ? "Uploading ..." : ""}
          </label>
          <input
            className={style.edit_input}
            type="file"
            id="single"
            accept="image/*"
            disabled={uploading}
            onChange={uploadAvatar}
          />
        </div>
      )}
    </div>
  );
}
