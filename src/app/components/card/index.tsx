"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import star from "../../assets/icons/star.png";
import gemFire from "../../assets/icons/gemFire.gif";
import gemPlant from "../../assets/icons/gemPlant.gif";
import gemWater from "../../assets/icons/gemWater.gif";
import MonsterImg from "./monsterImg";
import CardModal from "./cardModal";
import PixelArtProgressBar from "@/app/ui/buttons/PixelArtProgressBar";
interface CardModalProps {
  atk: number;
  def: number;
  stars: number;
  type: string;
  rarity: string;
  monster: number;
  monster_pick: string;
  id: number;
}
const Card = ({
  data,
  implementModal,
}: {
  data: CardModalProps;
  implementModal: boolean;
}) => {
  const rarityStyles: { [key: string]: string } = {
    rare: "#3aca0e",
    ultra_rare: "#8532a3",
    legendary: "#f0e04ee3",
    default: "#6e6f6f", //card type comun
  };
  const gemImageMap: { [key: string]: any } = {
    fire: gemFire,
    plant: gemPlant,
    water: gemWater,
    default: gemWater, //default value is water
  };
  const rarityColor = rarityStyles[data?.rarity] || rarityStyles.default;
  const gemImage = gemImageMap[data?.type] || gemImageMap.default;
  const [modalOpen, setModalOpen] = useState(false);
  const renderStars = () => {
    if (data.stars > 0 && data.stars <= 5) {
      return (
        <div className={styles.star_conteiner}>
          {[...Array(data.stars)].map((_, index) => (
            <Image key={index} className={styles.star} src={star} alt="star" />
          ))}
        </div>
      );
    } else {
      return (
        <div className={styles.star_conteiner}>
          <div className={styles.star} style={{ height: "20px" }}></div>
        </div>
      );
    }
  };

  return (
    <div className={styles.flex_container}>
      {implementModal && (
        <div>
          {modalOpen && (
            <CardModal data={data} onClose={() => setModalOpen(false)} />
          )}
        </div>
      )}
      <div
        className={styles.rare_conteiner}
        style={{
          filter: `drop-shadow(0px 0px 20px ${rarityColor})`,
        }}
      >
        <div onClick={() => setModalOpen(true)} className={styles.card}>
          <div className={styles.type_conteiner}>
            <div className={styles.gem_image_container}>
              <Image
                className={styles.shadow}
                src={gemImage}
                width={60}
                height={60}
                alt="gem"
              />
            </div>
            <div className={styles.progress_stats}>
              <div className={styles.progress_stats_atk}>
                ATK
                <PixelArtProgressBar progress={data.atk} color={"#e1ad1e"} />
              </div>
              <div className={styles.progress_stats_def}>
                DEF
                <PixelArtProgressBar progress={data.def} color={"#2a80c6"} />
              </div>
            </div>
          </div>

          <MonsterImg url={data?.monster_pick} size={135} />

          {renderStars()}
        </div>
      </div>
    </div>
  );
};

export default Card;
