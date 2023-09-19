import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import potionStar from "../../assets/icons/potionStar.jpeg";
import potionLove from "../../assets/icons/potionLove.gif";
import coin from "../../assets/icons/coin.gif";
import Avatar from "../avatar/avatar";
const NavBar = ({
  username,
  avatar_url,
  userId,
  lovePotios,
  starPotions,
  coins,
}: {
  username: string | null;
  avatar_url: string | null;
  userId: string | null;
  lovePotios: number | null;
  starPotions: number | null;
  coins: number | null;
}) => {
  return (
    <div className={styles.conteiner}>
      <div className={styles.perfil_container}>
        <div className={styles.perfil}>
          <Avatar
            uid={userId as string}
            url={avatar_url}
            size={90}
            onUpload={() => {}}
            editVisible={false}
          />
        </div>
        <div className={styles.nombreUser}>
          {username ? username : "...Loading"}
        </div>
      </div>
      <div className={styles.potionsCoins_conteiner}>
        <div className={styles.potions}>
          <Image src={potionLove} width={60} height={60} alt="potion" />
          {lovePotios ? lovePotios : 0}
        </div>
        <div className={styles.gemesCoins}>
          <Image src={potionStar} width={60} height={60} alt="potion" />
          {starPotions ? starPotions : 0}
        </div>
        <div className={styles.gemesCoins}>
          <Image src={coin} width={50} height={60} alt="potion" />
          {coins ? coins : 0}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
