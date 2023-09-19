"use client";
import React from "react";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import monster1 from "../../assets/monsters/monster1.png";
import monster2 from "../../assets/monsters/monster2.png";
import monster3 from "../../assets/monsters/monster3.png";
import styles from "./styles.module.css";
import star from "../../assets/icons/star.png";
import gemFire from "../../assets/icons/gemFire.gif";
import gemPlant from "../../assets/icons/gemPlant.gif";
import gemWater from "../../assets/icons/gemWater.gif";
import { cardBaseStore } from "@/store/cardBaseStore";
import { Database, Json } from "../../database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import MonsterImg from "./monsterImg";
import CardModal from "./cardModal";

const Card = ({ data }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {modalOpen && (
        <CardModal data={data} onClose={() => setModalOpen(false)} />
      )}
      <div className={styles.flex_container}>
        <div
          className={styles.rare_conteiner}
          style={{
            filter: `drop-shadow(0px 0px 20px ${
              data.rarity === "rare"
                ? "#3aca0e"
                : data.rarity === "ultra_rare"
                ? "#8532a3"
                : "#6e6f6f"
            })`,
          }}
        >
          <div onClick={() => setModalOpen(true)} className={styles.card}>
            <div className={styles.type_conteiner}>
              <div className={styles.gem_image_container}>
                <Image
                  className={styles.shadow}
                  src={
                    data.type === "fire"
                      ? gemFire
                      : data.type === "plant"
                      ? gemPlant
                      : data.type === "water"
                      ? gemWater
                      : gemWater
                  }
                  width={60}
                  height={60}
                  alt="gem"
                />
                <div className={styles.flash}></div>
              </div>
              <div className={styles.progress_stats}>
                <div
                  style={{
                    paddingTop: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  ATK{" "}
                  <progress
                    className="nes-progress is-primary "
                    style={{
                      width: "80px",
                      height: "10px",
                    }}
                    value={data.atk}
                    max="100"
                  ></progress>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  DEF{" "}
                  <progress
                    className="nes-progress is-success"
                    style={{
                      width: "80px",
                      height: "10px",
                    }}
                    value={data.def}
                    max="100"
                  ></progress>
                </div>
              </div>
            </div>

            <MonsterImg url={data?.monster_pick} size={150} />

            {data.stars > 0 && data.stars <= 5 ? (
              <div className={styles.star_conteiner}>
                {[...Array(data.stars)].map((_, index) => (
                  <Image
                    key={index}
                    className={styles.star}
                    src={star}
                    alt="star"
                  />
                ))}
              </div>
            ) : (
              <div className={styles.star_conteiner}>
                <div className={styles.star} style={{ height: "20px" }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
